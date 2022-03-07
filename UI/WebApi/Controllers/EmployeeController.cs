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
        private static List<Employee> employees = new List<Employee>
        {
            new Employee{ EmployeeId=1,FirstName = "Fernando",MiddleName="Ricardo",LastName="Ricardo",BirthDate=new DateTime(1989,3,7) }
        };

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            EmployeeRepository = employeeRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            var es = await EmployeeRepository.GetEmployeesAsync();
            return es;

        }


    }
}