using ExpenseTracker.Data.Entities;
using ExpenseTracker.Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Threading;

namespace ExpenseTracker.Data.Repositories
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        private readonly DataContext _context;

        public BaseRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> func, CancellationToken cancellationToken, params Expression<Func<TEntity, object>>[] includes)
        {
            var query = _context.Set<TEntity>().AsNoTracking().AsQueryable();

            foreach (var include in includes)
                query = query.Include(include);

            return await query.Where(func).ToListAsync(cancellationToken);
        }

        public async Task<List<TEntity>> GetAllAsync(CancellationToken cancellationToken, params Expression<Func<TEntity, object>>[] includes)
        {
            var query = _context.Set<TEntity>().AsNoTracking().AsQueryable();

            foreach (var include in includes)
                query = query.Include(include);

            return await query.ToListAsync(cancellationToken);
        }

        public async Task<TEntity> GetByIdAsync(int id, CancellationToken cancellationToken, params Expression<Func<TEntity, object>>[] includes)
        {
            var query = _context.Set<TEntity>().AsQueryable();

            foreach (var include in includes)
                query = query.Include(include);

            return await query.Where(x => x.Id.Equals(id)).FirstOrDefaultAsync(cancellationToken);
        }

        public TEntity Add(TEntity entity)
        {
            _context.Set<TEntity>().Add(entity);

            return entity;
        }

        public async Task<bool> CommitAsync(CancellationToken cancellationToken)
        {
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public void Delete(TEntity entity)
        {
            _context.Set<TEntity>().Remove(entity);
        }

        public void Update(TEntity entity)
        {
            _context.Set<TEntity>().Update(entity);
        }
    }
}
