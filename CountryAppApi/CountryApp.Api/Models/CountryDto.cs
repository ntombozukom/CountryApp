using System.Text.Json.Serialization;
using CountryApp.Api.Models;

public class CountryDto
{
    [JsonPropertyName("name")]
    public NameDto Name { get; set; } = new();

    [JsonPropertyName("region")]
    public string Region { get; set; } = string.Empty;

    [JsonPropertyName("capital")]
    public List<string>? Capital { get; set; }

    [JsonPropertyName("population")]
    public long Population { get; set; }

    [JsonPropertyName("flags")]
    public FlagsDto Flags { get; set; } = new();
}




