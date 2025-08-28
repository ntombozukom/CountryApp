using Country.Api.Models;

namespace Country.Api.Services
{
    public interface ICountryService
    {
         Task<List<CountryModel>> GetAllCountriesAsync();
         Task<CountryModel?> GetCountryByNameAsync(string countryName);
    }
}
