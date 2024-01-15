using System.ComponentModel.DataAnnotations.Schema;

namespace ExpenseTracker.Data.Entities
{
    public class Shopper : BaseEntity
    {
        [Column(TypeName = "varchar(32)")]
        public string Name { get; set; }
        public List<Expense> Expenses { get; set; }

        [Column(TypeName = "varchar(7)")]
        public string Color { get; set; }
    }
}
