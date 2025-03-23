import { titleCase } from 'title-case';
import { CodePoint, Field, Page, RawCodePoint, Search } from './models';
import unicode from './unicode.json';

const categories: { [_: string]: string } = {
  Cc: 'Control',
  Cf: 'Format',
  Co: 'Private Use',
  Cs: 'Surrrogate',
  Ll: 'Lowercase Letter',
  Lm: 'Modifier Letter',
  Lo: 'Other Letter',
  Lt: 'Titlecase Letter',
  Lu: 'Uppercase Letter',
  Mc: 'Spacing Mark',
  Me: 'Enclosing Mark',
  Mn: 'Nonspacing Mark',
  Nd: 'Decimal Number',
  Nl: 'Letter Number',
  No: 'Other Number',
  Pc: 'Connector Punctuation',
  Pd: 'Dash Punctuation',
  Pe: 'Close Punctuation',
  Pf: 'Final Punctuation',
  Pi: 'Initial Punctuation',
  Po: 'Other Punctuation',
  Ps: 'Open Punctuation',
  Sc: 'Currency Symbol',
  Sk: 'Modifier Symbol',
  Sm: 'Math Symbol',
  So: 'Other Symbol',
  Zl: 'Line Separator',
  Zp: 'Paragraph Separator',
  Zs: 'Space Separator',
};

const combiningClasses: { [_: string]: string } = {
  0: 'Not Reordered',
  1: 'Overlay',
  6: '',
  7: 'Nukta',
  8: 'Kana Voicing',
  9: 'Virama',
  10: 'CCC10',
  11: 'CCC11',
  12: 'CCC12',
  13: 'CCC13',
  14: 'CCC14',
  15: 'CCC15',
  16: 'CCC16',
  17: 'CCC17',
  18: 'CCC18',
  19: 'CCC19',
  20: 'CCC20',
  21: 'CCC21',
  22: 'CCC22',
  23: 'CCC23',
  24: 'CCC24',
  25: 'CCC25',
  26: 'CCC26',
  27: 'CCC27',
  28: 'CCC28',
  29: 'CCC29',
  30: 'CCC30',
  31: 'CCC31',
  32: 'CCC32',
  33: 'CCC33',
  34: 'CCC34',
  35: 'CCC35',
  36: 'CCC36',
  84: 'CCC84',
  91: 'CCC91',
  103: 'CCC103',
  107: 'CCC107',
  118: 'CCC118',
  122: 'CCC122',
  129: 'CCC129',
  130: 'CCC130',
  132: 'CCC132',
  202: 'Attached Below',
  214: 'Attached Above',
  216: 'Attached Above Right',
  218: 'Below Left',
  220: 'Below',
  222: 'Below Right',
  224: 'Left',
  226: 'Right',
  228: 'Above Left',
  230: 'Above',
  232: 'Above Right',
  233: 'Double Below',
  234: 'Double Above',
  240: 'Iota Subscript',
};

const bidirectionalClasses: { [_: string]: string } = {
  AL: 'Arabic Letter',
  AN: 'Arabic Number',
  B: 'Paragraph Separator',
  BN: 'Boundary Neutral',
  CS: 'Common Separator',
  EN: 'European Number',
  ES: 'European Separator',
  ET: 'European Terminator',
  FSI: 'First Strong Isolate',
  L: 'Left To Right',
  LRE: 'Left To Right Embedding',
  LRI: 'Left To Right Isolate',
  LRO: 'Left To Right Override',
  NSM: 'Nonspacing Mark',
  ON: 'Other Neutral',
  PDF: 'Pop Directional Format',
  PDI: 'Pop Directional Isolate',
  R: 'Right To Left',
  RLE: 'Right To Left Embedding',
  RLI: 'Right To Left Isolate',
  RLO: 'Right To Left Override',
  S: 'Segment Separator',
  WS: 'White Space',
};

const decompositionClasses: { [_: string]: string } = {
  circle: 'Encircled form',
  compat: 'Otherwise unspecified compatibility character',
  final: 'Final presentation form (Arabic)',
  font: 'Font variant',
  fraction: 'Vulgar fraction form',
  initial: 'Initial presentation form (Arabic)',
  isolated: 'Isolated presentation form (Arabic)',
  medial: 'Medial presentation form (Arabic)',
  narrow: 'Narrow (or hankaku) compatibility character',
  noBreak: 'No-break version of a space or hyphen',
  small: 'Small variant form (CNS compatibility)',
  square: 'CJK squared font variant',
  sub: 'Subscript form',
  super: 'Superscript form',
  vertical: 'Vertical layout presentation form',
  wide: 'Wide (or zenkaku) compatibility character',
};

function getPlane(value: number): string {
  if (value >= 0x0000 && value <= 0xFFFF) {
    return 'Basic Multilingual Plane';
  }

  if (value >= 0x10000 && value <= 0x1FFFF) {
    return 'Supplementary Multilingual Plane';
  }

  if (value >= 0x20000 && value <= 0x2FFFF) {
    return 'Supplementary Ideographic Plane';
  }

  if (value >= 0x30000 && value <= 0xDFFFF) {
    return 'Unassigned';
  }

  if (value >= 0xE0000 && value <= 0xEFFFF) {
    return 'Supplement­ary Special-purpose Plane';
  }

  if (value >= 0xF0000 && value <= 0xFFFFF) {
    return 'Supplement­ary Private Use Area planes';
  }

  if (value >= 0x100000 && value <= 0x10FFFF) {
    return 'Supplement­ary Private Use Area planes';
  }

  return '';
}

function getBlock(value: number): string {
  if (value >= 0x0000 && value <= 0x007F) {
    return 'Basic Latin';
  }

  if (value >= 0x0080 && value <= 0x00FF) {
    return 'Latin-1 Supplement';
  }

  if (value >= 0x0100 && value <= 0x017F) {
    return 'Latin Extended-A';
  }

  if (value >= 0x0180 && value <= 0x024F) {
    return 'Latin Extended-B';
  }

  if (value >= 0x0250 && value <= 0x02AF) {
    return 'IPA Extensions';
  }

  if (value >= 0x02B0 && value <= 0x02FF) {
    return 'Spacing Modifier Letters';
  }

  if (value >= 0x0300 && value <= 0x036F) {
    return 'Combining Diacritical Marks';
  }

  if (value >= 0x0370 && value <= 0x03FF) {
    return 'Greek and Coptic';
  }

  if (value >= 0x0400 && value <= 0x04FF) {
    return 'Cyrillic';
  }

  if (value >= 0x0500 && value <= 0x052F) {
    return 'Cyrillic Supplement';
  }

  if (value >= 0x0530 && value <= 0x058F) {
    return 'Armenian';
  }

  if (value >= 0x0590 && value <= 0x05FF) {
    return 'Hebrew';
  }

  if (value >= 0x0600 && value <= 0x06FF) {
    return 'Arabic';
  }

  if (value >= 0x0700 && value <= 0x074F) {
    return 'Syriac';
  }

  if (value >= 0x0750 && value <= 0x077F) {
    return 'Arabic Supplement';
  }

  if (value >= 0x0780 && value <= 0x07BF) {
    return 'Thaana';
  }

  if (value >= 0x07C0 && value <= 0x07FF) {
    return 'NKo';
  }

  if (value >= 0x0800 && value <= 0x083F) {
    return 'Samaritan';
  }

  if (value >= 0x0840 && value <= 0x085F) {
    return 'Mandaic';
  }

  if (value >= 0x0860 && value <= 0x086F) {
    return 'Syriac Supplement';
  }

  if (value >= 0x08A0 && value <= 0x08FF) {
    return 'Arabic Extended-A';
  }

  if (value >= 0x0900 && value <= 0x097F) {
    return 'Devanagari';
  }

  if (value >= 0x0980 && value <= 0x09FF) {
    return 'Bengali';
  }

  if (value >= 0x0A00 && value <= 0x0A7F) {
    return 'Gurmukhi';
  }

  if (value >= 0x0A80 && value <= 0x0AFF) {
    return 'Gujarati';
  }

  if (value >= 0x0B00 && value <= 0x0B7F) {
    return 'Oriya';
  }

  if (value >= 0x0B80 && value <= 0x0BFF) {
    return 'Tamil';
  }

  if (value >= 0x0C00 && value <= 0x0C7F) {
    return 'Telugu';
  }

  if (value >= 0x0C80 && value <= 0x0CFF) {
    return 'Kannada';
  }

  if (value >= 0x0D00 && value <= 0x0D7F) {
    return 'Malayalam';
  }

  if (value >= 0x0D80 && value <= 0x0DFF) {
    return 'Sinhala';
  }

  if (value >= 0x0E00 && value <= 0x0E7F) {
    return 'Thai';
  }

  if (value >= 0x0E80 && value <= 0x0EFF) {
    return 'Lao';
  }

  if (value >= 0x0F00 && value <= 0x0FFF) {
    return 'Tibetan';
  }

  if (value >= 0x1000 && value <= 0x109F) {
    return 'Myanmar';
  }

  if (value >= 0x10A0 && value <= 0x10FF) {
    return 'Georgian';
  }

  if (value >= 0x1100 && value <= 0x11FF) {
    return 'Hangul Jamo';
  }

  if (value >= 0x1200 && value <= 0x137F) {
    return 'Ethiopic';
  }

  if (value >= 0x1380 && value <= 0x139F) {
    return 'Ethiopic Supplement';
  }

  if (value >= 0x13A0 && value <= 0x13FF) {
    return 'Cherokee';
  }

  if (value >= 0x1400 && value <= 0x167F) {
    return 'Unified Canadian Aboriginal Syllabics';
  }

  if (value >= 0x1680 && value <= 0x169F) {
    return 'Ogham';
  }

  if (value >= 0x16A0 && value <= 0x16FF) {
    return 'Runic';
  }

  if (value >= 0x1700 && value <= 0x171F) {
    return 'Tagalog';
  }

  if (value >= 0x1720 && value <= 0x173F) {
    return 'Hanunoo';
  }

  if (value >= 0x1740 && value <= 0x175F) {
    return 'Buhid';
  }

  if (value >= 0x1760 && value <= 0x177F) {
    return 'Tagbanwa';
  }

  if (value >= 0x1780 && value <= 0x17FF) {
    return 'Khmer';
  }

  if (value >= 0x1800 && value <= 0x18AF) {
    return 'Mongolian';
  }

  if (value >= 0x18B0 && value <= 0x18FF) {
    return 'Unified Canadian Aboriginal Syllabics Extended';
  }

  if (value >= 0x1900 && value <= 0x194F) {
    return 'Limbu';
  }

  if (value >= 0x1950 && value <= 0x197F) {
    return 'Tai Le';
  }

  if (value >= 0x1980 && value <= 0x19DF) {
    return 'New Tai Lue';
  }

  if (value >= 0x19E0 && value <= 0x19FF) {
    return 'Khmer Symbols';
  }

  if (value >= 0x1A00 && value <= 0x1A1F) {
    return 'Buginese';
  }

  if (value >= 0x1A20 && value <= 0x1AAF) {
    return 'Tai Tham';
  }

  if (value >= 0x1AB0 && value <= 0x1AFF) {
    return 'Combining Diacritical Marks Extended';
  }

  if (value >= 0x1B00 && value <= 0x1B7F) {
    return 'Balinese';
  }

  if (value >= 0x1B80 && value <= 0x1BBF) {
    return 'Sundanese';
  }

  if (value >= 0x1BC0 && value <= 0x1BFF) {
    return 'Batak';
  }

  if (value >= 0x1C00 && value <= 0x1C4F) {
    return 'Lepcha';
  }

  if (value >= 0x1C50 && value <= 0x1C7F) {
    return 'Ol Chiki';
  }

  if (value >= 0x1C80 && value <= 0x1C8F) {
    return 'Cyrillic Extended-C';
  }

  if (value >= 0x1C90 && value <= 0x1CBF) {
    return 'Georgian Extended';
  }

  if (value >= 0x1CC0 && value <= 0x1CCF) {
    return 'Sundanese Supplement';
  }

  if (value >= 0x1CD0 && value <= 0x1CFF) {
    return 'Vedic Extensions';
  }

  if (value >= 0x1D00 && value <= 0x1D7F) {
    return 'Phonetic Extensions';
  }

  if (value >= 0x1D80 && value <= 0x1DBF) {
    return 'Phonetic Extensions Supplement';
  }

  if (value >= 0x1DC0 && value <= 0x1DFF) {
    return 'Combining Diacritical Marks Supplement';
  }

  if (value >= 0x1E00 && value <= 0x1EFF) {
    return 'Latin Extended Additional';
  }

  if (value >= 0x1F00 && value <= 0x1FFF) {
    return 'Greek Extended';
  }

  if (value >= 0x2000 && value <= 0x206F) {
    return 'General Punctuation';
  }

  if (value >= 0x2070 && value <= 0x209F) {
    return 'Superscripts and Subscripts';
  }

  if (value >= 0x20A0 && value <= 0x20CF) {
    return 'Currency Symbols';
  }

  if (value >= 0x20D0 && value <= 0x20FF) {
    return 'Combining Diacritical Marks for Symbols';
  }

  if (value >= 0x2100 && value <= 0x214F) {
    return 'Letterlike Symbols';
  }

  if (value >= 0x2150 && value <= 0x218F) {
    return 'Number Forms';
  }

  if (value >= 0x2190 && value <= 0x21FF) {
    return 'Arrows';
  }

  if (value >= 0x2200 && value <= 0x22FF) {
    return 'Mathematical Operators';
  }

  if (value >= 0x2300 && value <= 0x23FF) {
    return 'Miscellaneous Technical';
  }

  if (value >= 0x2400 && value <= 0x243F) {
    return 'Control Pictures';
  }

  if (value >= 0x2440 && value <= 0x245F) {
    return 'Optical Character Recognition';
  }

  if (value >= 0x2460 && value <= 0x24FF) {
    return 'Enclosed Alphanumerics';
  }

  if (value >= 0x2500 && value <= 0x257F) {
    return 'Box Drawing';
  }

  if (value >= 0x2580 && value <= 0x259F) {
    return 'Block Elements';
  }

  if (value >= 0x25A0 && value <= 0x25FF) {
    return 'Geometric Shapes';
  }

  if (value >= 0x2600 && value <= 0x26FF) {
    return 'Miscellaneous Symbols';
  }

  if (value >= 0x2700 && value <= 0x27BF) {
    return 'Dingbats';
  }

  if (value >= 0x27C0 && value <= 0x27EF) {
    return 'Miscellaneous Mathematical Symbols-A';
  }

  if (value >= 0x27F0 && value <= 0x27FF) {
    return 'Supplemental Arrows-A';
  }

  if (value >= 0x2800 && value <= 0x28FF) {
    return 'Braille Patterns';
  }

  if (value >= 0x2900 && value <= 0x297F) {
    return 'Supplemental Arrows-B';
  }

  if (value >= 0x2980 && value <= 0x29FF) {
    return 'Miscellaneous Mathematical Symbols-B';
  }

  if (value >= 0x2A00 && value <= 0x2AFF) {
    return 'Supplemental Mathematical Operators';
  }

  if (value >= 0x2B00 && value <= 0x2BFF) {
    return 'Miscellaneous Symbols and Arrows';
  }

  if (value >= 0x2C00 && value <= 0x2C5F) {
    return 'Glagolitic';
  }

  if (value >= 0x2C60 && value <= 0x2C7F) {
    return 'Latin Extended-C';
  }

  if (value >= 0x2C80 && value <= 0x2CFF) {
    return 'Coptic';
  }

  if (value >= 0x2D00 && value <= 0x2D2F) {
    return 'Georgian Supplement';
  }

  if (value >= 0x2D30 && value <= 0x2D7F) {
    return 'Tifinagh';
  }

  if (value >= 0x2D80 && value <= 0x2DDF) {
    return 'Ethiopic Extended';
  }

  if (value >= 0x2DE0 && value <= 0x2DFF) {
    return 'Cyrillic Extended-A';
  }

  if (value >= 0x2E00 && value <= 0x2E7F) {
    return 'Supplemental Punctuation';
  }

  if (value >= 0x2E80 && value <= 0x2EFF) {
    return 'CJK Radicals Supplement';
  }

  if (value >= 0x2F00 && value <= 0x2FDF) {
    return 'Kangxi Radicals';
  }

  if (value >= 0x2FF0 && value <= 0x2FFF) {
    return 'Ideographic Description Characters';
  }

  if (value >= 0x3000 && value <= 0x303F) {
    return 'CJK Symbols and Punctuation';
  }

  if (value >= 0x3040 && value <= 0x309F) {
    return 'Hiragana';
  }

  if (value >= 0x30A0 && value <= 0x30FF) {
    return 'Katakana';
  }

  if (value >= 0x3100 && value <= 0x312F) {
    return 'Bopomofo';
  }

  if (value >= 0x3130 && value <= 0x318F) {
    return 'Hangul Compatibility Jamo';
  }

  if (value >= 0x3190 && value <= 0x319F) {
    return 'Kanbun';
  }

  if (value >= 0x31A0 && value <= 0x31BF) {
    return 'Bopomofo Extended';
  }

  if (value >= 0x31C0 && value <= 0x31EF) {
    return 'CJK Strokes';
  }

  if (value >= 0x31F0 && value <= 0x31FF) {
    return 'Katakana Phonetic Extensions';
  }

  if (value >= 0x3200 && value <= 0x32FF) {
    return 'Enclosed CJK Letters and Months';
  }

  if (value >= 0x3300 && value <= 0x33FF) {
    return 'CJK Compatibility';
  }

  if (value >= 0x3400 && value <= 0x4DBF) {
    return 'CJK Unified Ideographs Extension A';
  }

  if (value >= 0x4DC0 && value <= 0x4DFF) {
    return 'Yijing Hexagram Symbols';
  }

  if (value >= 0x4E00 && value <= 0x9FFF) {
    return 'CJK Unified Ideographs';
  }

  if (value >= 0xA000 && value <= 0xA48F) {
    return 'Yi Syllables';
  }

  if (value >= 0xA490 && value <= 0xA4CF) {
    return 'Yi Radicals';
  }

  if (value >= 0xA4D0 && value <= 0xA4FF) {
    return 'Lisu';
  }

  if (value >= 0xA500 && value <= 0xA63F) {
    return 'Vai';
  }

  if (value >= 0xA640 && value <= 0xA69F) {
    return 'Cyrillic Extended-B';
  }

  if (value >= 0xA6A0 && value <= 0xA6FF) {
    return 'Bamum';
  }

  if (value >= 0xA700 && value <= 0xA71F) {
    return 'Modifier Tone Letters';
  }

  if (value >= 0xA720 && value <= 0xA7FF) {
    return 'Latin Extended-D';
  }

  if (value >= 0xA800 && value <= 0xA82F) {
    return 'Syloti Nagri';
  }

  if (value >= 0xA830 && value <= 0xA83F) {
    return 'Common Indic Number Forms';
  }

  if (value >= 0xA840 && value <= 0xA87F) {
    return 'Phags-pa';
  }

  if (value >= 0xA880 && value <= 0xA8DF) {
    return 'Saurashtra';
  }

  if (value >= 0xA8E0 && value <= 0xA8FF) {
    return 'Devanagari Extended';
  }

  if (value >= 0xA900 && value <= 0xA92F) {
    return 'Kayah Li';
  }

  if (value >= 0xA930 && value <= 0xA95F) {
    return 'Rejang';
  }

  if (value >= 0xA960 && value <= 0xA97F) {
    return 'Hangul Jamo Extended-A';
  }

  if (value >= 0xA980 && value <= 0xA9DF) {
    return 'Javanese';
  }

  if (value >= 0xA9E0 && value <= 0xA9FF) {
    return 'Myanmar Extended-B';
  }

  if (value >= 0xAA00 && value <= 0xAA5F) {
    return 'Cham';
  }

  if (value >= 0xAA60 && value <= 0xAA7F) {
    return 'Myanmar Extended-A';
  }

  if (value >= 0xAA80 && value <= 0xAADF) {
    return 'Tai Viet';
  }

  if (value >= 0xAAE0 && value <= 0xAAFF) {
    return 'Meetei Mayek Extensions';
  }

  if (value >= 0xAB00 && value <= 0xAB2F) {
    return 'Ethiopic Extended-A';
  }

  if (value >= 0xAB30 && value <= 0xAB6F) {
    return 'Latin Extended-E';
  }

  if (value >= 0xAB70 && value <= 0xABBF) {
    return 'Cherokee Supplement';
  }

  if (value >= 0xABC0 && value <= 0xABFF) {
    return 'Meetei Mayek';
  }

  if (value >= 0xAC00 && value <= 0xD7AF) {
    return 'Hangul Syllables';
  }

  if (value >= 0xD7B0 && value <= 0xD7FF) {
    return 'Hangul Jamo Extended-B';
  }

  if (value >= 0xD800 && value <= 0xDB7F) {
    return 'High Surrogates';
  }

  if (value >= 0xDB80 && value <= 0xDBFF) {
    return 'High Private Use Surrogates';
  }

  if (value >= 0xDC00 && value <= 0xDFFF) {
    return 'Low Surrogates';
  }

  if (value >= 0xE000 && value <= 0xF8FF) {
    return 'Private Use Area';
  }

  if (value >= 0xF900 && value <= 0xFAFF) {
    return 'CJK Compatibility Ideographs';
  }

  if (value >= 0xFB00 && value <= 0xFB4F) {
    return 'Alphabetic Presentation Forms';
  }

  if (value >= 0xFB50 && value <= 0xFDFF) {
    return 'Arabic Presentation Forms-A';
  }

  if (value >= 0xFE00 && value <= 0xFE0F) {
    return 'Variation Selectors';
  }

  if (value >= 0xFE10 && value <= 0xFE1F) {
    return 'Vertical Forms';
  }

  if (value >= 0xFE20 && value <= 0xFE2F) {
    return 'Combining Half Marks';
  }

  if (value >= 0xFE30 && value <= 0xFE4F) {
    return 'CJK Compatibility Forms';
  }

  if (value >= 0xFE50 && value <= 0xFE6F) {
    return 'Small Form Variants';
  }

  if (value >= 0xFE70 && value <= 0xFEFF) {
    return 'Arabic Presentation Forms-B';
  }

  if (value >= 0xFF00 && value <= 0xFFEF) {
    return 'Halfwidth and Fullwidth Forms';
  }

  if (value >= 0xFFF0 && value <= 0xFFFF) {
    return 'Specials';
  }

  if (value >= 0x10000 && value <= 0x1007F) {
    return 'Linear B Syllabary';
  }

  if (value >= 0x10080 && value <= 0x100FF) {
    return 'Linear B Ideograms';
  }

  if (value >= 0x10100 && value <= 0x1013F) {
    return 'Aegean Numbers';
  }

  if (value >= 0x10140 && value <= 0x1018F) {
    return 'Ancient Greek Numbers';
  }

  if (value >= 0x10190 && value <= 0x101CF) {
    return 'Ancient Symbols';
  }

  if (value >= 0x101D0 && value <= 0x101FF) {
    return 'Phaistos Disc';
  }

  if (value >= 0x10280 && value <= 0x1029F) {
    return 'Lycian';
  }

  if (value >= 0x102A0 && value <= 0x102DF) {
    return 'Carian';
  }

  if (value >= 0x102E0 && value <= 0x102FF) {
    return 'Coptic Epact Numbers';
  }

  if (value >= 0x10300 && value <= 0x1032F) {
    return 'Old Italic';
  }

  if (value >= 0x10330 && value <= 0x1034F) {
    return 'Gothic';
  }

  if (value >= 0x10350 && value <= 0x1037F) {
    return 'Old Permic';
  }

  if (value >= 0x10380 && value <= 0x1039F) {
    return 'Ugaritic';
  }

  if (value >= 0x103A0 && value <= 0x103DF) {
    return 'Old Persian';
  }

  if (value >= 0x10400 && value <= 0x1044F) {
    return 'Deseret';
  }

  if (value >= 0x10450 && value <= 0x1047F) {
    return 'Shavian';
  }

  if (value >= 0x10480 && value <= 0x104AF) {
    return 'Osmanya';
  }

  if (value >= 0x104B0 && value <= 0x104FF) {
    return 'Osage';
  }

  if (value >= 0x10500 && value <= 0x1052F) {
    return 'Elbasan';
  }

  if (value >= 0x10530 && value <= 0x1056F) {
    return 'Caucasian Albanian';
  }

  if (value >= 0x10600 && value <= 0x1077F) {
    return 'Linear A';
  }

  if (value >= 0x10800 && value <= 0x1083F) {
    return 'Cypriot Syllabary';
  }

  if (value >= 0x10840 && value <= 0x1085F) {
    return 'Imperial Aramaic';
  }

  if (value >= 0x10860 && value <= 0x1087F) {
    return 'Palmyrene';
  }

  if (value >= 0x10880 && value <= 0x108AF) {
    return 'Nabataean';
  }

  if (value >= 0x108E0 && value <= 0x108FF) {
    return 'Hatran';
  }

  if (value >= 0x10900 && value <= 0x1091F) {
    return 'Phoenician';
  }

  if (value >= 0x10920 && value <= 0x1093F) {
    return 'Lydian';
  }

  if (value >= 0x10980 && value <= 0x1099F) {
    return 'Meroitic Hieroglyphs';
  }

  if (value >= 0x109A0 && value <= 0x109FF) {
    return 'Meroitic Cursive';
  }

  if (value >= 0x10A00 && value <= 0x10A5F) {
    return 'Kharoshthi';
  }

  if (value >= 0x10A60 && value <= 0x10A7F) {
    return 'Old South Arabian';
  }

  if (value >= 0x10A80 && value <= 0x10A9F) {
    return 'Old North Arabian';
  }

  if (value >= 0x10AC0 && value <= 0x10AFF) {
    return 'Manichaean';
  }

  if (value >= 0x10B00 && value <= 0x10B3F) {
    return 'Avestan';
  }

  if (value >= 0x10B40 && value <= 0x10B5F) {
    return 'Inscriptional Parthian';
  }

  if (value >= 0x10B60 && value <= 0x10B7F) {
    return 'Inscriptional Pahlavi';
  }

  if (value >= 0x10B80 && value <= 0x10BAF) {
    return 'Psalter Pahlavi';
  }

  if (value >= 0x10C00 && value <= 0x10C4F) {
    return 'Old Turkic';
  }

  if (value >= 0x10C80 && value <= 0x10CFF) {
    return 'Old Hungarian';
  }

  if (value >= 0x10D00 && value <= 0x10D3F) {
    return 'Hanifi Rohingya';
  }

  if (value >= 0x10E60 && value <= 0x10E7F) {
    return 'Rumi Numeral Symbols';
  }

  if (value >= 0x10E80 && value <= 0x10EBF) {
    return 'Yezidi';
  }

  if (value >= 0x10F00 && value <= 0x10F2F) {
    return 'Old Sogdian';
  }

  if (value >= 0x10F30 && value <= 0x10F6F) {
    return 'Sogdian';
  }

  if (value >= 0x10FB0 && value <= 0x10FDF) {
    return 'Chorasmian';
  }

  if (value >= 0x10FE0 && value <= 0x10FFF) {
    return 'Elymaic';
  }

  if (value >= 0x11000 && value <= 0x1107F) {
    return 'Brahmi';
  }

  if (value >= 0x11080 && value <= 0x110CF) {
    return 'Kaithi';
  }

  if (value >= 0x110D0 && value <= 0x110FF) {
    return 'Sora Sompeng';
  }

  if (value >= 0x11100 && value <= 0x1114F) {
    return 'Chakma';
  }

  if (value >= 0x11150 && value <= 0x1117F) {
    return 'Mahajani';
  }

  if (value >= 0x11180 && value <= 0x111DF) {
    return 'Sharada';
  }

  if (value >= 0x111E0 && value <= 0x111FF) {
    return 'Sinhala Archaic Numbers';
  }

  if (value >= 0x11200 && value <= 0x1124F) {
    return 'Khojki';
  }

  if (value >= 0x11280 && value <= 0x112AF) {
    return 'Multani';
  }

  if (value >= 0x112B0 && value <= 0x112FF) {
    return 'Khudawadi';
  }

  if (value >= 0x11300 && value <= 0x1137F) {
    return 'Grantha';
  }

  if (value >= 0x11400 && value <= 0x1147F) {
    return 'Newa';
  }

  if (value >= 0x11480 && value <= 0x114DF) {
    return 'Tirhuta';
  }

  if (value >= 0x11580 && value <= 0x115FF) {
    return 'Siddham';
  }

  if (value >= 0x11600 && value <= 0x1165F) {
    return 'Modi';
  }

  if (value >= 0x11660 && value <= 0x1167F) {
    return 'Mongolian Supplement';
  }

  if (value >= 0x11680 && value <= 0x116CF) {
    return 'Takri';
  }

  if (value >= 0x11700 && value <= 0x1173F) {
    return 'Ahom';
  }

  if (value >= 0x11800 && value <= 0x1184F) {
    return 'Dogra';
  }

  if (value >= 0x118A0 && value <= 0x118FF) {
    return 'Warang Citi';
  }

  if (value >= 0x11900 && value <= 0x1195F) {
    return 'Dives Akuru';
  }

  if (value >= 0x119A0 && value <= 0x119FF) {
    return 'Nandinagari';
  }

  if (value >= 0x11A00 && value <= 0x11A4F) {
    return 'Zanabazar Square';
  }

  if (value >= 0x11A50 && value <= 0x11AAF) {
    return 'Soyombo';
  }

  if (value >= 0x11AC0 && value <= 0x11AFF) {
    return 'Pau Cin Hau';
  }

  if (value >= 0x11C00 && value <= 0x11C6F) {
    return 'Bhaiksuki';
  }

  if (value >= 0x11C70 && value <= 0x11CBF) {
    return 'Marchen';
  }

  if (value >= 0x11D00 && value <= 0x11D5F) {
    return 'Masaram Gondi';
  }

  if (value >= 0x11D60 && value <= 0x11DAF) {
    return 'Gunjala Gondi';
  }

  if (value >= 0x11EE0 && value <= 0x11EFF) {
    return 'Makasar';
  }

  if (value >= 0x11FB0 && value <= 0x11FBF) {
    return 'Lisu Supplement';
  }

  if (value >= 0x11FC0 && value <= 0x11FFF) {
    return 'Tamil Supplement';
  }

  if (value >= 0x12000 && value <= 0x123FF) {
    return 'Cuneiform';
  }

  if (value >= 0x12400 && value <= 0x1247F) {
    return 'Cuneiform Numbers and Punctuation';
  }

  if (value >= 0x12480 && value <= 0x1254F) {
    return 'Early Dynastic Cuneiform';
  }

  if (value >= 0x13000 && value <= 0x1342F) {
    return 'Egyptian Hieroglyphs';
  }

  if (value >= 0x13430 && value <= 0x1343F) {
    return 'Egyptian Hieroglyph Format Controls';
  }

  if (value >= 0x14400 && value <= 0x1467F) {
    return 'Anatolian Hieroglyphs';
  }

  if (value >= 0x16800 && value <= 0x16A3F) {
    return 'Bamum Supplement';
  }

  if (value >= 0x16A40 && value <= 0x16A6F) {
    return 'Mro';
  }

  if (value >= 0x16AD0 && value <= 0x16AFF) {
    return 'Bassa Vah';
  }

  if (value >= 0x16B00 && value <= 0x16B8F) {
    return 'Pahawh Hmong';
  }

  if (value >= 0x16E40 && value <= 0x16E9F) {
    return 'Medefaidrin';
  }

  if (value >= 0x16F00 && value <= 0x16F9F) {
    return 'Miao';
  }

  if (value >= 0x16FE0 && value <= 0x16FFF) {
    return 'Ideographic Symbols and Punctuation';
  }

  if (value >= 0x17000 && value <= 0x187FF) {
    return 'Tangut';
  }

  if (value >= 0x18800 && value <= 0x18AFF) {
    return 'Tangut Components';
  }

  if (value >= 0x18B00 && value <= 0x18CFF) {
    return 'Khitan Small Script';
  }

  if (value >= 0x18D00 && value <= 0x18D8F) {
    return 'Tangut Supplement';
  }

  if (value >= 0x1B000 && value <= 0x1B0FF) {
    return 'Kana Supplement';
  }

  if (value >= 0x1B100 && value <= 0x1B12F) {
    return 'Kana Extended-A';
  }

  if (value >= 0x1B130 && value <= 0x1B16F) {
    return 'Small Kana Extension';
  }

  if (value >= 0x1B170 && value <= 0x1B2FF) {
    return 'Nushu';
  }

  if (value >= 0x1BC00 && value <= 0x1BC9F) {
    return 'Duployan';
  }

  if (value >= 0x1BCA0 && value <= 0x1BCAF) {
    return 'Shorthand Format Controls';
  }

  if (value >= 0x1D000 && value <= 0x1D0FF) {
    return 'Byzantine Musical Symbols';
  }

  if (value >= 0x1D100 && value <= 0x1D1FF) {
    return 'Musical Symbols';
  }

  if (value >= 0x1D200 && value <= 0x1D24F) {
    return 'Ancient Greek Musical Notation';
  }

  if (value >= 0x1D2E0 && value <= 0x1D2FF) {
    return 'Mayan Numerals';
  }

  if (value >= 0x1D300 && value <= 0x1D35F) {
    return 'Tai Xuan Jing Symbols';
  }

  if (value >= 0x1D360 && value <= 0x1D37F) {
    return 'Counting Rod Numerals';
  }

  if (value >= 0x1D400 && value <= 0x1D7FF) {
    return 'Mathematical Alphanumeric Symbols';
  }

  if (value >= 0x1D800 && value <= 0x1DAAF) {
    return 'Sutton SignWriting';
  }

  if (value >= 0x1E000 && value <= 0x1E02F) {
    return 'Glagolitic Supplement';
  }

  if (value >= 0x1E100 && value <= 0x1E14F) {
    return 'Nyiakeng Puachue Hmong';
  }

  if (value >= 0x1E2C0 && value <= 0x1E2FF) {
    return 'Wancho';
  }

  if (value >= 0x1E800 && value <= 0x1E8DF) {
    return 'Mende Kikakui';
  }

  if (value >= 0x1E900 && value <= 0x1E95F) {
    return 'Adlam';
  }

  if (value >= 0x1EC70 && value <= 0x1ECBF) {
    return 'Indic Siyaq Numbers';
  }

  if (value >= 0x1ED00 && value <= 0x1ED4F) {
    return 'Ottoman Siyaq Numbers';
  }

  if (value >= 0x1EE00 && value <= 0x1EEFF) {
    return 'Arabic Mathematical Alphabetic Symbols';
  }

  if (value >= 0x1F000 && value <= 0x1F02F) {
    return 'Mahjong Tiles';
  }

  if (value >= 0x1F030 && value <= 0x1F09F) {
    return 'Domino Tiles';
  }

  if (value >= 0x1F0A0 && value <= 0x1F0FF) {
    return 'Playing Cards';
  }

  if (value >= 0x1F100 && value <= 0x1F1FF) {
    return 'Enclosed Alphanumeric Supplement';
  }

  if (value >= 0x1F200 && value <= 0x1F2FF) {
    return 'Enclosed Ideographic Supplement';
  }

  if (value >= 0x1F300 && value <= 0x1F5FF) {
    return 'Miscellaneous Symbols and Pictographs';
  }

  if (value >= 0x1F600 && value <= 0x1F64F) {
    return 'Emoticons';
  }

  if (value >= 0x1F650 && value <= 0x1F67F) {
    return 'Ornamental Dingbats';
  }

  if (value >= 0x1F680 && value <= 0x1F6FF) {
    return 'Transport and Map Symbols';
  }

  if (value >= 0x1F700 && value <= 0x1F77F) {
    return 'Alchemical Symbols';
  }

  if (value >= 0x1F780 && value <= 0x1F7FF) {
    return 'Geometric Shapes Extended';
  }

  if (value >= 0x1F800 && value <= 0x1F8FF) {
    return 'Supplemental Arrows-C';
  }

  if (value >= 0x1F900 && value <= 0x1F9FF) {
    return 'Supplemental Symbols and Pictographs';
  }

  if (value >= 0x1FA00 && value <= 0x1FA6F) {
    return 'Chess Symbols';
  }

  if (value >= 0x1FA70 && value <= 0x1FAFF) {
    return 'Symbols and Pictographs Extended-A';
  }

  if (value >= 0x1FB00 && value <= 0x1FBFF) {
    return 'Symbols for Legacy Computing';
  }

  if (value >= 0x20000 && value <= 0x2A6DF) {
    return 'CJK Unified Ideographs Extension B';
  }

  if (value >= 0x2A700 && value <= 0x2B73F) {
    return 'CJK Unified Ideographs Extension C';
  }

  if (value >= 0x2B740 && value <= 0x2B81F) {
    return 'CJK Unified Ideographs Extension D';
  }

  if (value >= 0x2B820 && value <= 0x2CEAF) {
    return 'CJK Unified Ideographs Extension E';
  }

  if (value >= 0x2CEB0 && value <= 0x2EBEF) {
    return 'CJK Unified Ideographs Extension F';
  }

  if (value >= 0x2F800 && value <= 0x2FA1F) {
    return 'CJK Compatibility Ideographs Supplement';
  }

  if (value >= 0x30000 && value <= 0x3134F) {
    return 'CJK Unified Ideographs Extension G';
  }

  if (value >= 0xE0000 && value <= 0xE007F) {
    return 'Tags';
  }

  if (value >= 0xE0100 && value <= 0xE01EF) {
    return 'Variation Selectors Supplement';
  }

  if (value >= 0xF0000 && value <= 0xFFFFF) {
    return 'Supplementary Private Use Area-A';
  }

  if (value >= 0x100000 && value <= 0x10FFFF) {
    return 'Supplementary Private Use Area-B';
  }

  return '';
}

export function getCodePoints(search: Search, size = 128): Page<CodePoint> {
  const page = search.page ?? 1;

  const filterByName = (tuple: string[]): boolean => {
    return new RegExp(`${search.search}`, 'i').test(tuple[1]);
  };

  const findByValue = (tuple: string[]): boolean => {
    return tuple[0].endsWith(search.search ?? '_');
  };

  const doSearch = (): string[][] => {
    if (search.search) {
      switch (search.field) {
        case Field.CodePoint:
        case Field.Literal: {
          const value = unicode.find(findByValue);

          return value ? (
            [value]
          ) : (
            []
          );
        }
        case Field.Name: {
          return unicode.filter(filterByName);
        }
      }
    }

    return unicode;
  };

  const filteredUnicode = doSearch();

  const pagedUnicode = (
    filteredUnicode
      .slice(size * (page - 1), size * page)
      .map(mapTupleToRawCodePoint)
      .map(mapRawCodePointToCodePoint)
  );

  const pageCount = Math.ceil(filteredUnicode.length / size);

  return {
    hasNext: page < pageCount,
    hasPrevious: (page - 1) > 0,
    children: pagedUnicode,
  };
}

export function getUnicodeFromString(string: string): number {
  let number = 0;

  for (const character of string) {
    number += character.codePointAt(0) ?? 0;
  }

  return number;
}

function mapTupleToRawCodePoint(tuple: string[]): RawCodePoint {
  return {
    codePoint: tuple[0],
    characterName: tuple[1],
    oldCharacterName: tuple[10],
    generalCategory: tuple[2],
    bidirectionalCategory: tuple[4],
    canonicalCombiningClasses: tuple[3],
    characterDecompositionMapping: tuple[5],
    digitValue: tuple[7],
    numericValue: tuple[8],
    decimalDigitValue: tuple[6],
    mirrored: tuple[9],
    commentField: tuple[11],
    uppercaseMapping: tuple[12],
    lowercaseMapping: tuple[13],
    titlecaseMapping: tuple[14],
  };
}

function mapRawCodePointToCodePoint(rawCodePoint: RawCodePoint): CodePoint {
  const value = Number.parseInt(rawCodePoint.codePoint, 16);

  return {
    key: value,
    name: titleCase(rawCodePoint.characterName.toLowerCase()),
    value: `U+${value.toString(16).toUpperCase().padStart(4, '0')}`,
    plane: getPlane(value),
    block: getBlock(value),
    category: categories[rawCodePoint.generalCategory],
    combiningClass: combiningClasses[rawCodePoint.canonicalCombiningClasses],
    bidirectionalClass: bidirectionalClasses[rawCodePoint.bidirectionalCategory],
    decompositionClass: decompositionClasses[rawCodePoint.characterDecompositionMapping.match(/^<(\w+)>.*$/)?.[1] ?? ''] ?? 'Canonical',
  };
}
