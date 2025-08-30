using System.Text.Json.Serialization;

namespace CountryApp.Api.Models
{
    public class NativeNameDto
    {
        [JsonPropertyName("official")]
        public string Official { get; set; } = string.Empty;

        [JsonPropertyName("common")]
        public string Common { get; set; } = string.Empty;
    }
}
