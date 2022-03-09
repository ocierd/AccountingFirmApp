using AFA.Shared.Entities.POCO;

namespace AFA.Data.DataAccess.Repository.Interfaces;
public interface IEmployeeRepository
{
    Task<Employee> CreateEmployeeAsync(Employee employee);
    Task<IEnumerable<Employee>> GetEmployeesAsync();

    Task<IEnumerable<Employee>> SearchEmployeesByCriteriaAsync(EmployeeSearchCiteria criteria);

    Task<Employee> UpdateEmployeesAsync(Employee employee);


    Task DeleteEmployeesAsync(int employeeId);

}
