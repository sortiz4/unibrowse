using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Unibrowse.Models;

namespace Unibrowse {
    public class DatabaseContext : DbContext {
        public DbSet<CodePoint> CodePoints { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseSqlite("Filename=db.sqlite");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<CodePoint>()
                .ToTable("codepoints")
                .HasIndex(c => c.Value)
                .IsUnique();
        }
    }

    public static class DatabaseInitializer {
        private const int UnicodeEnd = 0x10FFFF;

        public static void Initialize(DatabaseContext context) {
            context.Database.EnsureCreated();

            // Skip if the database has been initialized
            if(context.CodePoints.Any()) {
                return;
            }

            // Add all available code points to the database
            var codePoints = new List<CodePoint>();
            for(var i = 0; i < UnicodeEnd + 1; i++) {
                try {
                    codePoints.Add(new CodePoint(i));
                } catch(KeyNotFoundException) {
                    // Skip unknown code points
                }
            }
            context.CodePoints.AddRange(codePoints);
            context.SaveChanges();
        }
    }
}
