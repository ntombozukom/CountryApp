using System.Text.Json.Serialization;

public class RestCountryDto
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

public class NameDto
{
    [JsonPropertyName("common")]
    public string Common { get; set; } = string.Empty;

    [JsonPropertyName("official")]
    public string Official { get; set; } = string.Empty;

    [JsonPropertyName("nativeName")]
    public Dictionary<string, NativeNameDto>? NativeName { get; set; }
}

public class NativeNameDto
{
    [JsonPropertyName("official")]
    public string Official { get; set; } = string.Empty;

    [JsonPropertyName("common")]
    public string Common { get; set; } = string.Empty;
}

public class FlagsDto
{
    [JsonPropertyName("png")]
    public string Png { get; set; } = string.Empty;

    [JsonPropertyName("alt")]
    public string Alt { get; set; } = string.Empty;
}
