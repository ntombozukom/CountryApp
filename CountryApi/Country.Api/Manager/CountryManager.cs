using Country.Api.Models;
using Country.Api.Services;

namespace Country.Api.Manager
{
    public class CountryManager
    {
        private readonly ICountryService _service;

        public CountryManager(ICountryService service)
        {
            _service = service;
        }

        public async Task<List<CountryModel>> GetAllCountriesAsync()
        {
            try
            {
                var countries = await _service.GetAllCountriesAsync();
                return countries.OrderBy(c => c.Name).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in manager GetAllCountries: {ex.Message}");
                return new List<CountryModel>();
            }
        }

        public async Task<CountryModel?> GetCountryByNameAsync(string name)
        {
            try
            {
                return await _service.GetCountryByNameAsync(name);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in manager GetCountryByName: {ex.Message}");
                return new CountryModel();
            }
        }
    }
}