using AFA.Data.DataAccess.Context;
using AFA.Data.DataAccess.Repository.Interfaces;
using AFA.Shared.Entities.POCO;
using Microsoft.EntityFrameworkCore;

namespace AFA.Data.DataAccess.Repository;
public class EmployeeRepository : IEmployeeRepository
{
    private AccountingFirmContext _AccountingFirmContext;
    public EmployeeRepository(AccountingFirmContext accountingFirmContext)
    {
        _AccountingFirmContext = accountingFirmContext;
    }

    public async Task<IEnumerable<Employee>> GetEmployeesAsync()
    {
        // var genders = await _AccountingFirmContext.Genders.ToListAsync();
        // var cibilstatuses = await _AccountingFirmContext.CivilStatus.ToListAsync();

        var employees = await _AccountingFirmContext.Employees
        .Include(e => e.Gender)
        .Include(e => e.CivilStatus)
        .Include(e => e.Position)
        .ToListAsync();
        return employees;

    }
}
