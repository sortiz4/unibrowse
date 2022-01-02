using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using Unibrowse.Services;

namespace Unibrowse.Extensions
{
    public static class HostExtensions
    {
        public static IHost Setup(this IHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                try
                {
                    scope.ServiceProvider
                        .GetRequiredService<Database>()
                        .Initialize();
                }
                catch (Exception exc)
                {
                    scope.ServiceProvider
                        .GetRequiredService<ILogger<Program>>()
                        .LogError(exc, "An error occurred while initializing the database.");
                }
            }
            return host;
        }
    }
}
