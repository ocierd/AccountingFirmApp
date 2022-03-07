using AFA.Data.DataAccess.Repository.Interfaces;
using AFA.Shared.Entities.POCO;
using Microsoft.AspNetCore.Mvc;

namespace AFA.UI.WebApi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class GenderController : ApiControllerBase
    {
        private readonly IGenderRepository GenderRepository;

        
        public GenderController(IGenderRepository genderRepository)
        {
            GenderRepository = genderRepository;
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<Gender>> GetGendersAsync()
        {
            var genders = await GenderRepository.GetGendersAsync();
            return genders;

        }


    }
}