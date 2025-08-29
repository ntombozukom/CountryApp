using CountryApp.Api.Models;

namespace CountryApp.Api.Services
{
    public interface ICountryService
    {
         Task<List<Country>> GetAllCountriesAsync();
         Task<Country?> GetCountryByNameAsync(string countryName);
    }
}
