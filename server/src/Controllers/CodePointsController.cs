namespace Unibrowse.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Unibrowse.Collections;
using Unibrowse.Entities;
using Unibrowse.Services;

[Route("api/[controller]")]
public class CodePointsController : Controller
{
    private enum Field
    {
        Name,
        Value,
    }

    private readonly Database _database;

    public CodePointsController(Database database)
    {
        _database = database;
    }

    [HttpGet]
    public async Task<IActionResult> Get(int page, int field, string search)
    {
        IQueryable<CodePoint> GetRecords()
        {
            if (search?.Length > 0)
            {
                if (field == (int)Field.Value)
                {
                    var value = int.TryParse(search, out var i) ? i : -1;

                    // Search for a single code point
                    return
                    (
                        from c in _database.CodePoints
                        where c.Value == value
                        select c
                    );
                }

                // Search for a name (using likeness)
                return
                (
                    from c in _database.CodePoints
                    where EF.Functions.Like(c.Name, $"%{search}%")
                    select c
                );
            }

            // Query all code points
            return
            (
                from c in _database.CodePoints
                select c
            );
        }

        var records = GetRecords().OrderBy(c => c.Value).AsNoTracking();

        try
        {
            return Json(await Page<CodePoint>.CreateAsync(records, page));
        }
        catch (InvalidOperationException)
        {
            return NotFound();
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        try
        {
            return Json(await _database.CodePoints!.SingleAsync(c => c.Value == id));
        }
        catch (InvalidOperationException)
        {
            return NotFound();
        }
    }
}
