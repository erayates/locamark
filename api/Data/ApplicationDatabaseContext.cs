using locamark.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace locamark.Data
{
    public class ApplicationDatabaseContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDatabaseContext(DbContextOptions<ApplicationDatabaseContext> options) : base(options)
        {
        }


        public DbSet<Point> Points { get; set; }
        public DbSet<Geometry> Geometries { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure Geometry entity
            builder.Entity<Geometry>(x =>
            {
                x.HasKey(p => p.Id); // Set Id as the primary key
                x.Property(g => g.Id)
                    .ValueGeneratedOnAdd()
                    .UseIdentityAlwaysColumn();

                x.HasOne(g => g.AppUser)
                    .WithMany() // Assuming you add a Geometries collection to ApplicationUser
                    .HasForeignKey(g => g.AppUserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                },
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}


