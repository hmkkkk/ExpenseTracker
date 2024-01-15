using AutoMapper;
using ExpenseTracker.Data.Entities;
using ExpenseTracker.Dtos.Forms;
using ExpenseTracker.Dtos.ReturnDtos;

namespace ExpenseTracker.Profiles
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            CreateMap<Expense, ExpenseDto>();
            CreateMap<EditExpenseForm, Expense>();
            CreateMap<AddExpenseForm, Expense>();

            CreateMap<Shopper, ShopperDto>();
        }
    }
}
