using System.Linq.Expressions;

namespace ExpenseTracker.Data.Interfaces
{
    public interface IBaseRepository<TEntity>
    {
        Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> func, CancellationToken cancellationToken, params Expression<Func<TEntity, object>>[] includes);
        Task<List<TEntity>> GetAllAsync(CancellationToken cancellationToken, params Expression<Func<TEntity, object>>[] includes);
        Task<TEntity> GetByIdAsync(int id, CancellationToken cancellationToken, params Expression<Func<TEntity, object>>[] includes);
        void Update(TEntity entity);
        TEntity Add(TEntity entity);
        void Delete(TEntity entity);
        Task<bool> CommitAsync(CancellationToken cancellationToken);
    }
}
