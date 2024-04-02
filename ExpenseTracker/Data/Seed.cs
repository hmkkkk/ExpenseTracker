using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpenseTracker.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Shoppers.AnyAsync()) return;

            var users = new List<Shopper>
            {
                new Shopper
                {
                    Name = "Pawel",
                    Color = "#78BF9E"
                },
                new Shopper
                {
                    Name = "Alicja",
                    Color = "#800080"
                }
            };

            context.Shoppers.AddRange(users);

            await context.SaveChangesAsync();
        }
    }
}