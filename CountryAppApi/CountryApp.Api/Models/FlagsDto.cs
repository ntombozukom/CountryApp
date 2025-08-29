using System.Text.Json.Serialization;

namespace CountryApp.Api.Models
{
    public class FlagsDto
    {
        [JsonPropertyName("png")]
        public string Png { get; set; } = string.Empty;

        [JsonPropertyName("alt")]
        public string Alt { get; set; } = string.Empty;
    }
}
