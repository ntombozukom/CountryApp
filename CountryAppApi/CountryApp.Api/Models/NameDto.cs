using System.Text.Json.Serialization;

namespace CountryApp.Api.Models
{
    public class NameDto
    {
        [JsonPropertyName("common")]
        public string Common { get; set; } = string.Empty;

        [JsonPropertyName("official")]
        public string Official { get; set; } = string.Empty;

        [JsonPropertyName("nativeName")]
        public Dictionary<string, NativeNameDto>? NativeName { get; set; }
    }
}
