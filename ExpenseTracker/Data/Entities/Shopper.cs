namespace ExpenseTracker.Data.Entities
{
    public class Shopper : BaseEntity
    {
        public string Name { get; set; }
        public List<Expense> Expenses { get; set; }
    }
}
