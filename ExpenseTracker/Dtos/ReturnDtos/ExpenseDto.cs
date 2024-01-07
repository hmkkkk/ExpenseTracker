using ExpenseTracker.Data.Entities;

namespace ExpenseTracker.Dtos.ReturnDtos
{
    public class ExpenseDto
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string ShopperName { get; set; }
    }
}
