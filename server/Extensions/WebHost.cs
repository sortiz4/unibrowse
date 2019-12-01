using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;

namespace Unibrowse.Extensions {
    public static class WebHostExtensions {
        public static IWebHost EnsureDatabase(this IWebHost host) {
            try {
                DatabaseInitializer
                    .Initialize(host.Services.GetRequiredService<DatabaseContext>());
            } catch(Exception exc) {
                host.Services
                    .GetRequiredService<ILogger<Program>>()
                    .LogError(exc, "An error occurred while initializing the database.");
            }
            return host;
        }
    }
}
