using AFA.Shared.Entities.POCO;
using Microsoft.AspNetCore.Mvc;

namespace AFA.UI.WebApi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ApiControllerBase
    {
        private static List<Employee> employees = new List<Employee>
        {
            new Employee{ EmployeeId=1,FirstName = "Fernando",MiddleName="Ricardo",LastName="Ricardo",BirthDate=new DateTime(1989,3,7) }
        };

        [HttpGet]
        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            await Task.Delay(0);
            return employees;

        }


    }
}