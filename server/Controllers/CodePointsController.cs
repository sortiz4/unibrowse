using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Unibrowse.Collections;
using Unibrowse.Models;

namespace Unibrowse.Controllers {
    [Route("api/[controller]")]
    public class CodePointsController : Controller {
        private readonly DatabaseContext _db;

        public CodePointsController(DatabaseContext db) {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> Get() {
            IQueryable<CodePoint> records;
            var pageNumber = Request.Query["page"];
            var field = Request.Query["field"];
            var query = Request.Query["query"];
            if(query.Count > 0) {
                if(field == "value") {
                    // Search for a single code point
                    var value = -1;
                    try {
                        value = int.Parse(query);
                    } catch {
                        // The user submitted a bogus value
                    }
                    records = (
                        from c in _db.CodePoints
                        where c.Value == value
                        select c
                    );
                } else {
                    // Search for a name (using likeness)
                    records = (
                        from c in _db.CodePoints
                        where EF.Functions.Like(c.Name, $"%{query}%")
                        select c
                    );
                }
            } else {
                // Query all code points
                records = (
                    from c in _db.CodePoints
                    select c
                );
            }
            try {
                // Sort and paginate the results
                records = records.OrderBy(c => c.Value).AsNoTracking();
                var page = await Page<CodePoint>.CreateAsync(records, pageNumber);
                return Json(page);
            } catch(InvalidOperationException) {
                return NotFound();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id) {
            try {
                var record = await _db.CodePoints.SingleAsync(c => c.Value == id);
                return Json(record);
            } catch(InvalidOperationException) {
                return NotFound();
            }
        }
    }
}
