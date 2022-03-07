using AFA.Data.DataAccess.Context;
using AFA.Data.DataAccess.Repository.Interfaces;
using AFA.Shared.Entities.POCO;
using Microsoft.EntityFrameworkCore;

namespace AFA.Data.DataAccess.Repository;
public class GenderRepository : RepositoryAsync<Gender>, IGenderRepository
{

    public GenderRepository(AccountingFirmContext accountingFirmContext)
    : base(accountingFirmContext)
    {
    }

    public async Task<IEnumerable<Gender>> GetGendersAsync()
    {
        IEnumerable<Gender> genders = await base.GetAsync();
        return genders;
    }
}
