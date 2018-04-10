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
        private readonly DatabaseContext _context;

        public CodePointsController(DatabaseContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery(Name = "page")] string query) {
            try {
                var records = _context.CodePoints.OrderBy(c => c.Value);
                var page = await Page<CodePoint>.CreateAsync(records.AsNoTracking(), query);
                return Json(page);
            } catch(InvalidOperationException) {
                return NotFound();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id) {
            try {
                var record = await _context.CodePoints.SingleAsync(c => c.Value == id);
                return Json(record);
            } catch(InvalidOperationException) {
                return NotFound();
            }
        }
    }
}
