using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
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
        public async Task<IActionResult> Get(string query, string field, string page) {
            IQueryable<CodePoint> records;
            if(query?.Length > 0) {
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
            records = records.OrderBy(c => c.Value).AsNoTracking();

            try {
                return Json(await Page<CodePoint>.CreateAsync(records, page));
            } catch(InvalidOperationException) {
                return NotFound();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id) {
            try {
                return Json(await _db.CodePoints.SingleAsync(c => c.Value == id));
            } catch(InvalidOperationException) {
                return NotFound();
            }
        }
    }
}
