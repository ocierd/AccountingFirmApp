using AFA.Data.DataAccess.Context;
using AFA.Data.DataAccess.Repository.Interfaces;
using AFA.Shared.Entities.POCO;
using Microsoft.EntityFrameworkCore;

namespace AFA.Data.DataAccess.Repository;
public class EmployeeRepository : RepositoryAsync<Employee>, IEmployeeRepository
{

    public EmployeeRepository(AccountingFirmContext accountingFirmContext)
    : base(accountingFirmContext)
    {
    }

    public async Task<Employee> CreateEmployeeAsync(Employee employee)
    {
        var newEmployee = await CreateAsync(employee);
        return await _AccountingFirmContext.Employees
        .Include(e => e.Gender)
        .Include(e => e.CivilStatus)
        .Include(e => e.Position)
        .FirstOrDefaultAsync(e => e.EmployeeId == newEmployee.EmployeeId);
    }

    public async Task<IEnumerable<Employee>> GetEmployeesAsync()
    {
        var employees = await _AccountingFirmContext.Employees
        .Include(e => e.Gender)
        .Include(e => e.CivilStatus)
        .Include(e => e.Position)
        .ToListAsync();
        return employees;
    }

    public async Task<IEnumerable<Employee>> SearchEmployeesByCriteriaAsync(EmployeeSearchCiteria criteria)
    {
        IQueryable<Employee> firstQuery = _AccountingFirmContext.Employees
        .Where(e => e.FirstName.ToLower().Contains(criteria.Name.ToLower()) && e.Rfc.ToLower().Contains(criteria.Rfc.ToLower()));
        IQueryable<Employee> secondQuery = criteria.StillWorking ? firstQuery.Where(e => e.LeavingDate == null) : firstQuery.Where(e => e.LeavingDate != null);

        IEnumerable<Employee> employeesFound = await secondQuery
        .Include(e => e.Gender)
        .Include(e => e.CivilStatus)
        .Include(e => e.Position).ToListAsync();
        return employeesFound;
    }

    public async Task<Employee> UpdateEmployeesAsync(Employee employee)
        => await UpdateAsync(employee);



    public async Task DeleteEmployeesAsync(int employeeId)
    {
        Employee employeeToDelete = await GetAsync(e => e.EmployeeId == employeeId);
        await DeleteAsync(employeeToDelete);
    }


}
