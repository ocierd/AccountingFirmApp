using System.Linq.Expressions;

namespace AFA.Data.DataAccess.Repository.Interfaces;
public interface IRepositoryAsync<T>
{
    Task<T> CreateAsync(T entity);

    Task<IEnumerable<T>> GetAsync();

    Task<T> GetAsync(Expression<Func<T, bool>> predicate);


    Task<T> UpdateAsync(T entity);


    Task DeleteAsync(T entity);
}
