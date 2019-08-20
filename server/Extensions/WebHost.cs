using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Unibrowse.Extensions {
    public static class WebHostExtensions {
        public static IWebHost EnsureDatabase(this IWebHost host) {
            using(var scope = host.Services.CreateScope()) {
                var services = scope.ServiceProvider;
                try {
                    var context = services.GetRequiredService<DatabaseContext>();
                    DatabaseInitializer.Initialize(context);
                } catch(Exception exc) {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(exc, "An error occurred while initializing the database.");
                }
            }
            return host;
        }
    }
}
