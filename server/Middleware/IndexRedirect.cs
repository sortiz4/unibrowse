using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Net.Http.Headers;

namespace Unibrowse.Middleware {
    public class IndexRedirect : IRule {
        private const string Root = "/";
        private readonly Regex _path;

        public IndexRedirect() {
            _path = new Regex("^/(?!(?:api|static)/)(?:.*)?$");
        }

        public void ApplyRule(RewriteContext context) {
            var request = context.HttpContext.Request;
            if(request.Path.Value != Root && _path.IsMatch(request.Path.Value)) {
                var response = context.HttpContext.Response;
                response.Headers[HeaderNames.Location] = Root;
                response.StatusCode = StatusCodes.Status301MovedPermanently;
                context.Result = RuleResult.EndResponse;
            }
        }
    }
}
