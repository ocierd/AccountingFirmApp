using AFA.Shared.Entities.POCO;

namespace AFA.Data.DataAccess.Repository.Interfaces;
public interface IEmployeeRepository
{
    Task<IEnumerable<Employee>> GetEmployeesAsync();

}
