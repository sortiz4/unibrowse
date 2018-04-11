using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Unibrowse.Collections {
    public class Page<T> {
        public int PageNumber { get; }
        public int PageCount { get; }
        public bool HasNext { get; }
        public bool HasPrevious { get; }
        public List<T> Children { get; }

        public Page(int index, int pages, List<T> children) {
            PageNumber = index;
            PageCount = pages;
            HasNext = PageNumber < PageCount;
            HasPrevious = PageNumber > 1;
            Children = children;
        }

        public static async Task<Page<T>> CreateAsync(IQueryable<T> results, string query, int size = 128) {
            var index = 1;
            var count = await results.CountAsync();
            var pages = (int)Math.Ceiling(count / (double)size);

            if(count == 0) {
                // Return an empty page if the results are empty
                return new Page<T>(index, pages + 1, new List<T>());
            }
            try {
                index = int.Parse(query);
            } catch {
                // The user submitted a bogus page index
            } finally {
                // Clamp the page index within range
                index = Math.Clamp(index, 1, pages);
            }

            // Paginate the results
            var children = await results.Skip((index - 1) * size).Take(size).ToListAsync();
            return new Page<T>(index, pages, children);
        }
    }
}
