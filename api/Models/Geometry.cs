namespace locamark.Models
{
    public class Geometry
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Wkt { get; set; }
        public string AppUserId { get; set; }
        public ApplicationUser AppUser { get; set; }
    }
}
