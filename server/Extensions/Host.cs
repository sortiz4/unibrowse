using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;

namespace Unibrowse.Extensions {
    public static class HostExtensions {
        public static IHost Setup(this IHost host) {
            using(var scope = host.Services.CreateScope()) {
                try {
                    DatabaseManager
                        .Initialize(scope.ServiceProvider.GetRequiredService<DatabaseContext>());
                } catch(Exception exc) {
                    scope.ServiceProvider
                        .GetRequiredService<ILogger<Program>>()
                        .LogError(exc, "An error occurred while initializing the database.");
                }
            }
            return host;
        }
    }
}
