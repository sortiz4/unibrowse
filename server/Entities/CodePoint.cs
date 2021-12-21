using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Unicode;

namespace Unibrowse.Entities
{
    public class CodePoint
    {
        public int Id { get; set; }

        public int Value { get; set; }

        public string Name { get; set; }

        public string Block { get; set; }

        public int Category { get; set; }

        public int CombiningClass { get; set; }

        public int BidirectionalClass { get; set; }

        public int DecompositionClass { get; set; }

        public CodePoint(int value)
        {
            var info = UnicodeInfo.GetCharInfo(value);

            if (info.Block == "No_Block")
            {
                throw new KeyNotFoundException();
            }

            if (info.Name != null)
            {
                Name = info.Name;
            }
            else if (info.NameAliases.Count > 0)
            {
                Name = info.NameAliases[0].Name;
            }
            else
            {
                Name = "NOT ASSIGNED";
            }

            Value = value;
            Block = info.Block;
            Category = (int)info.Category;
            CombiningClass = (int)info.CanonicalCombiningClass;
            BidirectionalClass = (int)info.BidirectionalClass;
            DecompositionClass = (int)info.DecompositionType;
        }
    }
}
