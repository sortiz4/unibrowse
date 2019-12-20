using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Unibrowse.Extensions;

namespace Unibrowse {
    public class Program {
        public static void Main(string[] args) {
            CreateHostBuilder(args).Build().Setup().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) {
            return (
                Host.CreateDefaultBuilder(args)
                    .ConfigureWebHostDefaults(web => web.UseStartup<Startup>())
            );
        }
    }
}
