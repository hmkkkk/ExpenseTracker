using ExpenseTracker.Data.Entities;
using ExpenseTracker.Data.Interfaces;

namespace ExpenseTracker.Data.Repositories
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity
    {

    }
}
