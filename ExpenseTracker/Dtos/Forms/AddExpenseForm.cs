using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.Dtos.Forms
{
    public class AddExpenseForm
    {
        [Required]
        [RegularExpression(@"^\d+(\.\d{1,2})?$", ErrorMessage = "Invalid decimal format")] // must be a decimal with max precision 2 or an integer
        public decimal Amount { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public int ShopperId { get; set; }
        public string? Description { get; set; }
    }
}
