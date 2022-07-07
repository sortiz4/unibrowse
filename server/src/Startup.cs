namespace Unibrowse;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Unibrowse.Services;

public class Startup
{
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment environment)
    {
        if (environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        app.UseFileServer()
            .UseRouting()
            .UseEndpoints(ConfigureEndpoints);
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddEntityFrameworkSqlite()
            .AddDbContext<Database>(ConfigureDatabase)
            .AddControllers();
    }

    private void ConfigureDatabase(DbContextOptionsBuilder options)
    {
        options.UseSqlite(_configuration.GetConnectionString("Default"));
    }

    private void ConfigureEndpoints(IEndpointRouteBuilder options)
    {
        options.MapControllers();
    }
}
