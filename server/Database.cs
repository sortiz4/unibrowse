using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Unibrowse.Models;

namespace Unibrowse {
    public class DatabaseContext : DbContext {
        public DbSet<CodePoint> CodePoints { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options) {
            options.UseSqlite("Filename=db.sqlite");
        }

        protected override void OnModelCreating(ModelBuilder model) {
            model.Entity<CodePoint>()
                .ToTable(nameof(CodePoint).ToLower())
                .HasIndex(c => c.Value)
                .IsUnique();
        }
    }

    public static class DatabaseManager {
        private const int UnicodeEnd = 0x10FFFF;

        public static void Initialize(DatabaseContext context) {
            context.Database.EnsureCreated();

            // Skip this if the database has been initialized
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
