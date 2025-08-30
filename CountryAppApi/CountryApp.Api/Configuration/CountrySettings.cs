namespace CountryApp.Api.Configuration
{
    public class CountrySettings
    {
       
            public static string SectionName => "CountrySettings";

            public string BaseUrl { get; set; } = string.Empty;
            public EndpointsConfig Endpoints { get; set; } = new();
            public string FieldsQuery { get; set; } = string.Empty;
        }

        public class EndpointsConfig
        {
            public string AllCountries { get; set; } = string.Empty;
            public string ByName { get; set; } = string.Empty;
        }
}
