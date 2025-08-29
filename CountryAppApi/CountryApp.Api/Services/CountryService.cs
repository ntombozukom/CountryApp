using System.Text.Json;
using CountryApp.Api.Configuration;
using CountryApp.Api.Models;
using Microsoft.Extensions.Options;

namespace CountryApp.Api.Services
{
    public class CountryService : ICountryService
    {
        private readonly HttpClient _http;
        private readonly CountrySettings _settings;

        public CountryService(HttpClient http, IOptions<CountrySettings> settings)
        {
            _http = http;
            _settings = settings.Value;
        }

        public async Task<List<Country>> GetAllCountriesAsync()
        {
            try
            {
                var url = $"{_settings.BaseUrl}{_settings.Endpoints.AllCountries}{_settings.FieldsQuery}";
                var response = await _http.GetAsync(url);
                var content = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                { 
                    Console.WriteLine($"INFO fetching all countries: {response.RequestMessage}");
                    return new List<Country>();
}
                var countries =  JsonSerializer.Deserialize<List<CountryDto>>(content);

                return countries?.Select(r => new Country
                {
                    Name = r.Name.Common,
                    OfficialName = r.Name.Official,
                    NativeName = r.Name.NativeName != null && r.Name.NativeName.Any()
                      ? r.Name.NativeName.Values.First().Common
                      : "N/A",
                    Region = r.Region,
                    Capitals = r.Capital != null && r.Capital.Any() ? r.Capital : new List<string>(),

                    Population = r.Population,
                    Flag = r.Flags.Png,
                    FlagAlt = r.Flags.Alt
                }).ToList() ?? new List<Country>();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching all countries: {ex.Message}");
                return new List<Country>();
            }
        }

        public async Task<Country?> GetCountryByNameAsync(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                return null;

            try
            {
                var url = $"{_settings.BaseUrl}{_settings.Endpoints.ByName.Replace("{name}", name)}{_settings.FieldsQuery}";

                var response = await _http.GetAsync(url);
                var content = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"INFO fetching country by name: {response.RequestMessage}");
                    return new Country();
                }
                
                var countries =  JsonSerializer.Deserialize<List<CountryDto>>(content);

                var country = countries?.FirstOrDefault();
                if (country == null) return null;

                return new Country
                {
                    Name = country.Name.Common,
                    OfficialName = country.Name.Official,
                    NativeName = country.Name.NativeName != null && country.Name.NativeName.Any()
                      ? country.Name.NativeName.Values.First().Common
                      : "N/A",
                    Region = country.Region,
                    Capitals = country.Capital != null && country.Capital.Any() ? country.Capital : new List<string>(),

                    Population = country.Population,
                    Flag = country.Flags.Png,
                    FlagAlt = country.Flags.Alt
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching country '{name}': {ex.Message}");
                return new Country();

            }
        }
    }
}
