using AFA.Data.DataAccess.Context;
using AFA.Data.DataAccess.Repository.Interfaces;
using AFA.Shared.Entities.POCO;
using Microsoft.EntityFrameworkCore;

namespace AFA.Data.DataAccess.Repository;
public class CivilStatusRepository : RepositoryAsync<CivilStatus>, ICivilStatusRepository
{

    public CivilStatusRepository(AccountingFirmContext accountingFirmContext)
    : base(accountingFirmContext)
    {
    }

    public async Task<IEnumerable<CivilStatus>> GetCivilStatusAsync()
    {
        IEnumerable<CivilStatus> civilStatus = await base.GetAsync();
        return civilStatus;
    }

}
