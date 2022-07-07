using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Unibrowse.Extensions;

namespace Unibrowse
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(h => h.UseStartup<Startup>())
                .Build()
                .Setup()
                .Run();
        }
    }
}
