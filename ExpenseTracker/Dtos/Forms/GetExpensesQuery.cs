namespace ExpenseTracker.Dtos.Forms
{
    public class GetExpensesQuery
    {
        public DateTime DateFrom { get; set; } = DateTime.Today.AddDays(-30);
        public DateTime DateTo { get; set; } = DateTime.Today;
        public int Uid { get; set; }
    }
}
