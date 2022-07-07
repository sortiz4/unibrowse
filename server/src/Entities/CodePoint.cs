namespace Unibrowse.Entities;

using System.Collections.Generic;
using System.Unicode;

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
        var unicode = UnicodeInfo.GetCharInfo(value);

        if (unicode.Block == "No_Block")
        {
            throw new KeyNotFoundException();
        }

        string GetName()
        {
            if (unicode.Name != null)
            {
                return unicode.Name;
            }
            if (unicode.NameAliases.Count > 0)
            {
                return unicode.NameAliases[0].Name;
            }
            return "NOT ASSIGNED";
        }

        Value = value;
        Name = GetName();
        Block = unicode.Block;
        Category = (int)unicode.Category;
        CombiningClass = (int)unicode.CanonicalCombiningClass;
        BidirectionalClass = (int)unicode.BidirectionalClass;
        DecompositionClass = (int)unicode.DecompositionType;
    }
}
