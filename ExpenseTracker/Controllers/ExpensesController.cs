using AutoMapper;
using ExpenseTracker.Data.Entities;
using ExpenseTracker.Data.Interfaces;
using ExpenseTracker.Dtos.Forms;
using ExpenseTracker.Dtos.ReturnDtos;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpensesController : Controller
    {
        private readonly IBaseRepository<Shopper> _shopperRepo;
        private readonly IBaseRepository<Expense> _expenseRepo;
        private readonly IMapper _mapper;

        public ExpensesController(IBaseRepository<Expense> expenseRepo, IBaseRepository<Shopper> shopper, IMapper mapper)
        {
            _shopperRepo = shopper;
            _expenseRepo = expenseRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<ExpenseDto>>> GetExpenses([FromQuery] GetExpensesQuery query, CancellationToken cancellationToken)
        {
            var expenses = new List<Expense>();

            if (query == null) query = new GetExpensesQuery();

            expenses = query.Uid is null
                ? await _expenseRepo.GetAllAsync(x => x.Date.Date >= query.DateFrom.Date && x.Date.Date <= query.DateTo.Date, cancellationToken, x => x.Shopper)
                : await _expenseRepo.GetAllAsync(x => x.Date.Date >= query.DateFrom.Date && x.Date.Date <= query.DateTo.Date && x.ShopperId == query.Uid, 
                    cancellationToken, x => x.Shopper);

            expenses = expenses.OrderByDescending(x => x.Date).ToList();

            var expensesMapped = _mapper.Map<List<ExpenseDto>>(expenses);

            return Ok(expensesMapped);
        }

        [HttpPost]
        public async Task<ActionResult<ExpenseDto>> CreateNewExpense([FromBody] AddExpenseForm form, CancellationToken cancellationToken)
        {
            if (form == null) return BadRequest();

            if (!ModelState.IsValid) return BadRequest();

            if (form.Amount <= 0) return BadRequest("Kwota musi być dodatnia");

            var expenseToDb = _mapper.Map<Expense>(form);

            _expenseRepo.Add(expenseToDb);
            var result = await _expenseRepo.CommitAsync(cancellationToken);

            if (!result) return BadRequest();

            expenseToDb.Shopper = await _shopperRepo.GetByIdAsync(expenseToDb.ShopperId, cancellationToken);

            var expenseMapped = _mapper.Map<ExpenseDto>(expenseToDb);

            return Ok(expenseMapped);
        }

        [HttpPut]
        public async Task<ActionResult<ExpenseDto>> EditExpense([FromBody] EditExpenseForm form, CancellationToken cancellationToken)
        {
            if (form == null) return BadRequest();

            if (!ModelState.IsValid) return BadRequest();

            var expenseFromDb = await _expenseRepo.GetByIdAsync(form.Id, cancellationToken, x => x.Shopper);

            if (expenseFromDb == null) return NotFound();

            _mapper.Map(form, expenseFromDb);

            _expenseRepo.Update(expenseFromDb);
            var result = await _expenseRepo.CommitAsync(cancellationToken);

            if (!result) return BadRequest();

            var expenseMapped = _mapper.Map<ExpenseDto>(expenseFromDb);

            return Ok(expenseMapped);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ExpenseDto>> GetExpenseById(int id, CancellationToken cancellationToken)
        {
            var expenseFromDb = await _expenseRepo.GetByIdAsync(id, cancellationToken, x => x.Shopper);

            if (expenseFromDb == null) return NotFound();

            var expenseMapped = _mapper.Map<ExpenseDto>(expenseFromDb);

            return Ok(expenseMapped);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteExpense(int id, CancellationToken cancellationToken)
        {
            var expenseFromDb = await _expenseRepo.GetByIdAsync(id, cancellationToken);

            if (expenseFromDb == null) return NotFound();

            _expenseRepo.Delete(expenseFromDb);
            var result = await _expenseRepo.CommitAsync(cancellationToken);

            if (!result) return BadRequest();
            return NoContent();
        }
    }
}
