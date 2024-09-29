using Microsoft.AspNetCore.Identity;

namespace locamark.Models
{
    public class ApplicationUser : IdentityUser
    {
        public List<Geometry> Geometries { get; set; } = new List<Geometry>();
    }
}
