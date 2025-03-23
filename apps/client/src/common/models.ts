export enum Field {
  CodePoint,
  Literal,
  Name,
}

export interface CodePoint {
  readonly key: number;
  readonly name: string;
  readonly value: string;
  readonly plane: string;
  readonly block: string;
  readonly category: string;
  readonly combiningClass: string;
  readonly bidirectionalClass: string;
  readonly decompositionClass: string;
}

export interface RawCodePoint {
  readonly codePoint: string;
  readonly characterName: string;
  readonly oldCharacterName: string;
  readonly generalCategory: string;
  readonly bidirectionalCategory: string;
  readonly canonicalCombiningClasses: string;
  readonly characterDecompositionMapping: string;
  readonly digitValue: string;
  readonly numericValue: string;
  readonly decimalDigitValue: string;
  readonly mirrored: string;
  readonly commentField: string;
  readonly uppercaseMapping: string;
  readonly lowercaseMapping: string;
  readonly titlecaseMapping: string;
}

export interface Page<T> {
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
  readonly children: T[];
}

export interface Search {
  readonly page?: number;
  readonly field?: Field;
  readonly search?: string;
}
