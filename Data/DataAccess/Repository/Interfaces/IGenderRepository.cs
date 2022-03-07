using AFA.Shared.Entities.POCO;

namespace AFA.Data.DataAccess.Repository.Interfaces;
public interface IGenderRepository
{
    Task<IEnumerable<Gender>> GetGendersAsync();

}
