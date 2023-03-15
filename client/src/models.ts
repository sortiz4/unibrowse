export enum ApiField {
  Name,
  Value,
}

export enum Status {
  Pending,
  Rejected,
  Resolved,
}

export interface ApiCodePoint {
  readonly id: number;
  readonly name: string;
  readonly value: number;
  readonly block: string;
  readonly category: number;
  readonly combiningClass: number;
  readonly bidirectionalClass: number;
  readonly decompositionClass: number;
}

export interface CodePoint {
  readonly id: number;
  readonly key: number;
  readonly name: string;
  readonly value: string;
  readonly block: string;
  readonly category: string;
  readonly combiningClass: string;
  readonly bidirectionalClass: string;
  readonly decompositionClass: string;
}

export interface Page<T> {
  readonly pageNumber: number;
  readonly pageCount: number;
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
  readonly children: T[];
}

export interface Search {
  readonly page?: number;
  readonly field?: number;
  readonly search?: string;
}

const categories = [
  'Uppercase Letter',
  'Lowercase Letter',
  'Titlecase Letter',
  'Modifier Letter',
  'Other Letter',
  'Nonspacing Mark',
  'Spacing Combining Mark',
  'Enclosing Mark',
  'Decimal Digit Number',
  'Letter Number',
  'Other Number',
  'Space Separator',
  'Line Separator',
  'Paragraph Separator',
  'Control',
  'Format',
  'Surrogate',
  'Private Use',
  'Connector Punctuation',
  'Dash Punctuation',
  'Open Punctuation',
  'Close Punctuation',
  'Initial Quote Punctuation',
  'Final Quote Punctuation',
  'Other Punctuation',
  'Math Symbol',
  'Currency Symbol',
  'Modifier Symbol',
  'Other Symbol',
  'Other (not assigned)',
];

const combiningClasses = {
  0: 'Not Reordered',
  1: 'Overlay',
  7: 'Nukta',
  8: 'Kana Voicing',
  9: 'Virama',
  200: 'Attached Below Left',
  202: 'Attached Below',
  204: 'Attached Below Right',
  208: 'Attached Left',
  210: 'Attached Right',
  212: 'Attached Above Left',
  214: 'Attached Above',
  216: 'Attached Above Right',
  218: 'Bottom Left',
  220: 'Below',
  222: 'Bottom Right',
  224: 'Left',
  226: 'Right',
  228: 'Top Left',
  230: 'Above',
  232: 'Top Right',
  233: 'Double Below',
  234: 'Double Above',
  240: 'Iota Subscript',
};

const bidirectionalClasses = [
  'Left-to-right',
  'Right-to-left',
  'Arabic Letter',
  'European Number',
  'European Separator',
  'European Terminator',
  'Arabic Number',
  'Common Separator',
  'Nonspacing Mark',
  'Boundary Neutral',
  'Paragraph Separator',
  'Segment Separator',
  'Whitespace',
  'Other Neutral',
  'Left-to-right Embedding',
  'Left-to-right Override',
  'Right-to-left Embedding',
  'Right-to-left Override',
  'Pop Directional Format',
  'Left-to-right Isolate',
  'Right-to-left Isolate',
  'First Strong Isolate',
  'Pop Directional Isolate',
];

const decompositionClasses = [
  'Canonical',
  'Font',
  'No-break',
  'Initial',
  'Medial',
  'Final',
  'Isolated',
  'Encircled',
  'Superscript',
  'Subscript',
  'Vertical',
  'Wide',
  'Narrow',
  'Small',
  'Square',
  'Fraction',
  'Compatibility',
];

export function mapApiCodePointToCodePoint(codePoint: ApiCodePoint): CodePoint {
  return {
    id: codePoint.id,
    key: codePoint.value,
    name: codePoint.name,
    value: `U+${codePoint.value.toString(16).toUpperCase().padStart(4, '0')}`,
    block: codePoint.block,
    category: categories[codePoint.category],
    combiningClass: codePoint.combiningClass < 10 || codePoint.combiningClass > 199 ? (
      (combiningClasses as { [_: number]: string })[codePoint.combiningClass]
    ) : (
      `CCC${codePoint.combiningClass}`
    ),
    bidirectionalClass: bidirectionalClasses[codePoint.bidirectionalClass],
    decompositionClass: decompositionClasses[codePoint.decompositionClass],
  };
}

export function mapPageToPage<T, U>(page: Page<T>, map: (_: T) => U): Page<U> {
  return {
    ...page,
    children: page.children.map(map),
  };
}
