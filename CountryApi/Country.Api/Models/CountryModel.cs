namespace Country.Api.Models
{
    public class CountryModel
    {
        public string Name { get; set; } = string.Empty;
        public string OfficialName { get; set; } = string.Empty;
        public string NativeName { get; set; } = string.Empty;
        public string Region { get; set; } = string.Empty;
        public List<string> Capitals { get; set; } = new List<string>();
        public long Population { get; set; }
        public string Flag { get; set; } = string.Empty;
        public string FlagAlt { get; set; } = string.Empty;
    }

}
