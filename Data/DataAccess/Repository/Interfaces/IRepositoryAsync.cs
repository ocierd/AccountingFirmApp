using System.Linq.Expressions;

namespace AFA.Data.DataAccess.Repository.Interfaces;
public interface IRepositoryAsync<T>
{
    Task CreateAsync(T entity);

    Task<IEnumerable<T>> GetAsync();

    Task<T> GetAsync(Expression<Func<T, bool>> predicate);


    Task UpdateAsync(T entity, Expression<Func<T, bool>> predicate);


    Task DeleteAsync(T entity);
}
