using System.ComponentModel.DataAnnotations.Schema;

namespace ExpenseTracker.Data.Entities
{
    public class Expense : BaseEntity
    {
        [Column(TypeName = "decimal(65, 2)")]
        public decimal Amount { get; set; }

        [Column(TypeName = "date")]
        public DateTime Date { get; set; }

        [Column(TypeName = "varchar(32)")]
        public string Title { get; set; }
        public string? Description { get; set; }
        public int ShopperId { get; set; }
        public Shopper Shopper { get; set; }
    }
}