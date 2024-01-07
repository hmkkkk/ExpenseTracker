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
        private readonly IBaseRepository<Expense> _repo;
        private readonly IMapper _mapper;

        public ExpensesController(IBaseRepository<Expense> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<ExpenseDto>>> GetExpenses([FromQuery] GetExpensesQuery query, CancellationToken cancellationToken)
        {
            var expenses = new List<Expense>();

            if (query == null) query = new GetExpensesQuery();

            expenses = query.Uid is null
                ? await _repo.GetAllAsync(x => x.Date.Date >= query.DateFrom.Date && x.Date.Date <= query.DateTo.Date, cancellationToken, x => x.Shopper)
                : await _repo.GetAllAsync(x => x.Date.Date >= query.DateFrom.Date && x.Date.Date <= query.DateTo.Date && x.ShopperId == query.Uid, 
                    cancellationToken, x => x.Shopper);

            var expensesMapped = _mapper.Map<List<ExpenseDto>>(expenses);

            return Ok(expensesMapped);
        }

        [HttpPost]
        public async Task<ActionResult<ExpenseDto>> CreateNewExpense([FromBody] AddExpenseForm form, CancellationToken cancellationToken)
        {
            if (form == null) return BadRequest();

            if (!ModelState.IsValid) return BadRequest();

            var expenseToDb = _mapper.Map<Expense>(form);

            _repo.Add(expenseToDb);
            var result = await _repo.CommitAsync(cancellationToken);

            if (!result) return BadRequest();

            var expenseMapped = _mapper.Map<ExpenseDto>(expenseToDb);

            return Ok(expenseMapped);
        }

        [HttpPut]
        public async Task<ActionResult<ExpenseDto>> EditExpense([FromBody] EditExpenseForm form, CancellationToken cancellationToken)
        {
            if (form == null) return BadRequest();

            if (!ModelState.IsValid) return BadRequest();

            var expenseFromDb = await _repo.GetByIdAsync(form.Id, cancellationToken, x => x.Shopper);

            if (expenseFromDb == null) return NotFound();

            _mapper.Map(form, expenseFromDb);

            _repo.Update(expenseFromDb);
            var result = await _repo.CommitAsync(cancellationToken);

            if (!result) return BadRequest();

            var expenseMapped = _mapper.Map<ExpenseDto>(expenseFromDb);

            return Ok(expenseMapped);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ExpenseDto>> GetExpenseById(int id, CancellationToken cancellationToken)
        {
            var expenseFromDb = await _repo.GetByIdAsync(id, cancellationToken, x => x.Shopper);

            if (expenseFromDb == null) return NotFound();

            var expenseMapped = _mapper.Map<ExpenseDto>(expenseFromDb);

            return Ok(expenseMapped);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteExpense(int id, CancellationToken cancellationToken)
        {
            var expenseFromDb = await _repo.GetByIdAsync(id, cancellationToken);

            if (expenseFromDb == null) return NotFound();

            _repo.Delete(expenseFromDb);
            var result = await _repo.CommitAsync(cancellationToken);

            if (!result) return BadRequest();
            return NoContent();
        }
    }
}
