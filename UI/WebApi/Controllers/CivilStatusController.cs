using AFA.Data.DataAccess.Repository.Interfaces;
using AFA.Shared.Entities.POCO;
using Microsoft.AspNetCore.Mvc;

namespace AFA.UI.WebApi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class CivilStatusController : ApiControllerBase
    {
        private readonly ICivilStatusRepository CivilStatusRepository;

        public CivilStatusController(ICivilStatusRepository civilStatusRepository)
        {
            CivilStatusRepository = civilStatusRepository;
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<CivilStatus>> GetCivilStatusAsync()
        {
            var cs = await CivilStatusRepository.GetCivilStatusAsync();
            return cs;

        }



    }
}