using AFA.Data.DataAccess.Context;
using AFA.Data.DataAccess.Repository.Interfaces;
using AFA.Shared.Entities.POCO;
using Microsoft.EntityFrameworkCore;

namespace AFA.Data.DataAccess.Repository;
public class PositionRepository : RepositoryAsync<Position>, IPositionRepository
{

    public PositionRepository(AccountingFirmContext accountingFirmContext)
    : base(accountingFirmContext)
    {
    }

    public async Task<IEnumerable<Position>> GetPositionsAsync()
    {
        IEnumerable<Position> positions = await base.GetAsync();
        return positions;
    }
}
