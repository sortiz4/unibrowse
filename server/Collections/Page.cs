using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Unibrowse.Collections
{
    public class Page<T>
    {
        public int PageNumber { get; }
        public int PageCount { get; }
        public bool HasNext { get; }
        public bool HasPrevious { get; }
        public List<T> Children { get; }

        public static async Task<Page<T>> CreateAsync(IQueryable<T> results, int offset, int size = 128)
        {
            var count = await results.CountAsync();
            var pages = (int)Math.Ceiling(count / (double)size);
            var index = Math.Clamp(offset, 1, Math.Max(pages, 1));

            if (count == 0)
            {
                // Return an empty page if the results are empty
                return new Page<T>(1, pages + 1, new List<T>());
            }

            // Paginate the results
            return new Page<T>(index, pages, await results.Skip((index - 1) * size).Take(size).ToListAsync());
        }

        public Page(int index, int pages, List<T> children)
        {
            PageNumber = index;
            PageCount = pages;
            HasNext = PageNumber < PageCount;
            HasPrevious = PageNumber > 1;
            Children = children;
        }
    }
}
