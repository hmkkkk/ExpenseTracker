namespace ExpenseTracker.Data.Entities
{
    public class Expense : BaseEntity
    {
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public int ShopperId { get; set; }
        public Shopper Shopper { get; set; }
    }
}