using AFA.Data.DataAccess.Repository.Interfaces;
using AFA.Shared.Entities.POCO;
using Microsoft.AspNetCore.Mvc;

namespace AFA.UI.WebApi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class PositionController : ApiControllerBase
    {
        private readonly IPositionRepository PositionRepository;

        
        public PositionController(IPositionRepository positionRepository)
        {
            PositionRepository = positionRepository;
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<Position>> GetPositionsAsync()
        {
            var es = await PositionRepository.GetPositionsAsync();
            return es;

        }


    }
}