using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Net.Http.Headers;

namespace Unibrowse.Middleware {
    public class AppendSlash : IRule {
        public void ApplyRule(RewriteContext context) {
            var request = context.HttpContext.Request;
            if(!request.Path.Value.EndsWith("/")) {
                var response = context.HttpContext.Response;
                response.Headers[HeaderNames.Location] = $"{request.Path}/{request.QueryString}";
                response.StatusCode = StatusCodes.Status301MovedPermanently;
                context.Result = RuleResult.EndResponse;
            }
        }
    }
}
