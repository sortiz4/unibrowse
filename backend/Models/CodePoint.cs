using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Unicode;
using Newtonsoft.Json;

namespace Unibrowse.Models {
    public class CodePoint {
        [Column("id"), JsonIgnore]
        public int Id { get; set; }

        [Column("value")]
        public int Value { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("block")]
        public string Block { get; set; }

        [Column("category")]
        public int Category { get; set; }

        [Column("bidirectional_class")]
        public int BidirectionalClass { get; set; }

        [Column("combining_class")]
        public int CombiningClass { get; set; }

        [Column("decomposition_class")]
        public int DecompositionClass { get; set; }

        public CodePoint() {
            // Empty constructor (required)
        }

        public CodePoint(int value) {
            var info = UnicodeInfo.GetCharInfo(value);
            if(info.Block.Equals("No_Block")) {
                throw new KeyNotFoundException();
            }
            if(info.Name != null) {
                Name = info.Name;
            } else if(info.NameAliases.Count > 0) {
                Name = info.NameAliases[0].Name;
            }
            Value = value;
            Block = info.Block;
            Category = (int)info.Category;
            BidirectionalClass = (int)info.BidirectionalClass;
            CombiningClass = (int)info.CanonicalCombiningClass;
            DecompositionClass = (int)info.DecompositionType;
        }
    }
}
