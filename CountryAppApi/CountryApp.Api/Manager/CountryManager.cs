using CountryApp.Api.Models;
using CountryApp.Api.Services;

namespace CountryApp.Api.Manager
{
    public class CountryManager
    {
        private readonly ICountryService _service;

        public CountryManager(ICountryService service)
        {
            _service = service;
        }

        public async Task<List<Models.Country>> GetAllCountriesAsync()
        {
            try
            {
                var countries = await _service.GetAllCountriesAsync();
                return countries.OrderBy(c => c.Name).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in manager GetAllCountries: {ex.Message}");
                return new List<Models.Country>();
            }
        }

        public async Task<Models.Country?> GetCountryByNameAsync(string name)
        {
            try
            {
                return await _service.GetCountryByNameAsync(name);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in manager GetCountryByName: {ex.Message}");
                return new Models.Country();
            }
        }
    }
}