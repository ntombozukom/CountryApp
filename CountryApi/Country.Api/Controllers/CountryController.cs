using Country.Api.Manager;
using Country.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Country.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CountryController : ControllerBase
    {
        private readonly CountryManager _countryManager;

        public CountryController(CountryManager countryManager)
        {
            _countryManager = countryManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var countries = await _countryManager.GetAllCountriesAsync();
            return Ok(countries);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetByName(string name)
        {
            var country = await _countryManager.GetCountryByNameAsync(name);
            return country is not null ? Ok(country) : NotFound();
        }
    }
}
