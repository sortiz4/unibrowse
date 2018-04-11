using System;
using Microsoft.Extensions.DependencyInjection;

namespace Unibrowse.Services {
    public static class CorsService {
        public static IServiceCollection AddCorsPolicies(this IServiceCollection services) {
            if(services == null) {
                throw new ArgumentNullException(nameof(services));
            }
            return services.AddCors(options => {
                options.AddPolicy("AllowAnyOrigin", builder => {
                    builder.AllowAnyOrigin();
                });
            });
        }
    }
}
