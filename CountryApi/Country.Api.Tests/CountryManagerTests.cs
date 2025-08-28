using Country.Api.Manager;
using Country.Api.Models;
using Country.Api.Services;
using NSubstitute;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Country.Api.Tests
{
    public class CountryManagerTests
    {
        private ICountryService _countryService;
        private CountryManager _manager;

        [SetUp]
        public void Setup()
        {
            _countryService = Substitute.For<ICountryService>();
            _manager = new CountryManager(_countryService);
        }
        [Test]
        public async Task GetAllCountriesAsync_ReturnsCountries()
        {
            var countries = new List<CountryModel>
                {
                    new CountryModel { Name = "South Africa" },
                    new CountryModel { Name = "Canada" }
                };

            _countryService.GetAllCountriesAsync()
                .Returns(Task.FromResult(countries));

            var result = await _manager.GetAllCountriesAsync();

            Assert.IsNotNull(result);
            CollectionAssert.AreEquivalent(   // ✅ ignores ordering
                countries.Select(c => c.Name).ToList(),
                result.Select(c => c.Name).ToList()
            );
        }


        [Test]
        public async Task GetCountryByNameAsync_ReturnsCountryIfFound()
        {
            var country = new CountryModel { Name = "USA" };

            // FIX: wrap in Task
            _countryService.GetCountryByNameAsync("USA").Returns(Task.FromResult(country));

            var result = await _manager.GetCountryByNameAsync("USA");

            Assert.IsNotNull(result);
            Assert.AreEqual(country, result);
        }

        [Test]
        public async Task GetCountryByNameAsync_ReturnsNullIfNotFound()
        {
            // FIX: wrap in Task
            _countryService.GetCountryByNameAsync("Unknown").Returns(Task.FromResult<CountryModel>(null));

            var result = await _manager.GetCountryByNameAsync("Unknown");

            Assert.IsNull(result);
        }
    }
}
