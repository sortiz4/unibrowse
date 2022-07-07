namespace Unibrowse.Services;

using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Unibrowse.Entities;

public class Database : DbContext
{
    public DbSet<CodePoint>? CodePoints { get; set; }

    public Database(DbContextOptions options) : base(options)
    {
    }

    public void Initialize()
    {
        Database.EnsureCreated();

        // Skip this if the database has been initialized
        if (CodePoints!.Any())
        {
            return;
        }

        var unicodeEnd = 0x10FFFF;
        var codePoints = new List<CodePoint>();

        // Add all available code points to the database
        for (var i = 0; i < unicodeEnd + 1; i++)
        {
            try
            {
                codePoints.Add(new CodePoint(i));
            }
            catch (KeyNotFoundException)
            {
                // Skip unknown code points
            }
        }

        CodePoints!.AddRange(codePoints);
        SaveChanges();
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<CodePoint>().HasIndex(e => e.Value).IsUnique();
    }
}
