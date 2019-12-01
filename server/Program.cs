using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Unibrowse.Extensions;

namespace Unibrowse {
    public class Program {
        public static void Main(string[] args) {
            BuildWebHost(args)
                .EnsureDatabase()
                .Run();
        }

        private static IWebHost BuildWebHost(string[] args) {
            return (
                WebHost.CreateDefaultBuilder(args)
                    .UseStartup<Startup>()
                    .Build()
            );
        }
    }
}
