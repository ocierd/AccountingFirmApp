using AFA.Shared.Entities.POCO;

namespace AFA.Data.DataAccess.Repository.Interfaces;
public interface IPositionRepository
{
    Task<IEnumerable<Position>> GetPositionsAsync();

}
