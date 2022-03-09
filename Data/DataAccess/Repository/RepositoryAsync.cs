using System.Linq.Expressions;
using AFA.Data.DataAccess.Context;
using AFA.Data.DataAccess.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AFA.Data.DataAccess.Repository;
public class RepositoryAsync<T> : IRepositoryAsync<T> where T : class
{
    private DbSet<T> DbSet;
    protected readonly AccountingFirmContext _AccountingFirmContext;

    public RepositoryAsync(AccountingFirmContext accountingFirmContext)
    {
        _AccountingFirmContext = accountingFirmContext;
        DbSet = _AccountingFirmContext.Set<T>();
    }

    public async Task<IEnumerable<T>> GetAsync()
    {
        List<T> list = await DbSet.ToListAsync();
        return list;
    }

    public async Task<T> CreateAsync(T entity)
    {
        DbSet.Add(entity);
        await _AccountingFirmContext.SaveChangesAsync();
        return entity;
    }

    public async Task<T> GetAsync(Expression<Func<T, bool>> predicate)
    {
        T first = await DbSet.FirstOrDefaultAsync(predicate);
        return first;
    }

    public async Task<T> UpdateAsync(T entity)
    {
        DbSet.Update(entity);
        await _AccountingFirmContext.SaveChangesAsync();
        return entity;
    }

    public async Task DeleteAsync(T entity)
    {
        DbSet.Remove(entity);
        await _AccountingFirmContext.SaveChangesAsync();
    }
}
