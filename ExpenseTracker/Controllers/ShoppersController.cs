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
    public class ShoppersController : Controller
    {
        private readonly IBaseRepository<Shopper> _repo;
        private readonly IMapper _mapper;

        public ShoppersController(IBaseRepository<Shopper> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<ShopperDto>>> GetShoppersList(CancellationToken cancellationToken)
        {
            var shoppers = await _repo.GetAllAsync(cancellationToken);

            var shoppersMapped = _mapper.Map<List<ShopperDto>>(shoppers);

            return shoppersMapped;
        }
    }
}
