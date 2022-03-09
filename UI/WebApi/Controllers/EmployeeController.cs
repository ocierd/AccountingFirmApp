using AFA.Data.DataAccess.Repository.Interfaces;
using AFA.Shared.Entities.POCO;
using Microsoft.AspNetCore.Mvc;

namespace AFA.UI.WebApi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ApiControllerBase
    {
        private readonly IEmployeeRepository EmployeeRepository;

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            EmployeeRepository = employeeRepository;
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<Employee>> GetEmployeesAsync()
            => await EmployeeRepository.GetEmployeesAsync();


        [HttpPost("[action]")]
        public async Task<IEnumerable<Employee>> SearchByCriteria(EmployeeSearchCiteria criteria)
            => await EmployeeRepository.SearchEmployeesByCriteriaAsync(criteria);



        [HttpPost("[action]")]
        public async Task<Employee> CreateEmployeeAsync(Employee employee)
            => await EmployeeRepository.CreateEmployeeAsync(employee);




        [HttpPut("[action]")]
        public async Task UpdateEmployeeAsync(Employee employee)
            => await EmployeeRepository.UpdateEmployeesAsync(employee);



        [HttpDelete("[action]")]
        public async Task DeleteEmployeeAsync(int employeeId)
            => await EmployeeRepository.DeleteEmployeesAsync(employeeId);

    }
}