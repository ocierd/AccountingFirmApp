using AFA.Shared.Entities.POCO;

namespace AFA.Data.DataAccess.Repository.Interfaces;
public interface ICivilStatusRepository
{
    Task<IEnumerable<CivilStatus>> GetCivilStatusAsync();

}
