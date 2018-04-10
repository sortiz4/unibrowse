using System;
using Microsoft.Extensions.DependencyInjection;

namespace Unibrowse.Middleware {
    public static class CorsMiddleware {
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
