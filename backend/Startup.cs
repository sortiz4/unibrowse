using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;
using Unibrowse.Middleware;
using Unibrowse.Services;

namespace Unibrowse {
    public class Startup {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services.AddEntityFrameworkSqlite()
                .AddDbContext<DatabaseContext>()
                .AddCorsPolicies()
                .AddMvc()
                .AddJsonOptions(options => {
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver() {
                        NamingStrategy = new SnakeCaseNamingStrategy()
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env) {
            if(env.IsDevelopment()) {
                app.UseCors("AllowAnyOrigin")
                    .UseDeveloperExceptionPage();
            }
            var options = new RewriteOptions()
                .Add(new IndexRedirect())
                .Add(new AppendSlash());
            app.UseStaticFiles()
                .UseRewriter(options)
                .UseMvcWithDefaultRoute();
        }
    }
}
