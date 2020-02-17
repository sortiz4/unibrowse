import {Model} from 'core/models';

const CATEGORY = [
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
const COMBINING_CLASSES = {
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
const BIDIRECTIONAL_CLASSES = [
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
const DECOMPOSITION_CLASSES = [
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

export class CodePoint extends Model {
    static all() {
        return this.request('api/codepoints');
    }

    get key() {
        return this._value;
    }

    get value() {
        return `U+${this._value.toString(16).toUpperCase().padStart(4, '0')}`;
    }

    get category() {
        return CATEGORY[this._category];
    }

    get combiningClass() {
        return this._combiningClass < 10 || this._combiningClass > 199 ? (
            COMBINING_CLASSES[this._combiningClass]
        ) : (
            `CCC${this._combiningClass}`
        );
    }

    get bidirectionalClass() {
        return BIDIRECTIONAL_CLASSES[this._bidirectionalClass];
    }

    get decompositionClass() {
        return DECOMPOSITION_CLASSES[this._decompositionClass];
    }

    constructor({
        value,
        category,
        combiningClass,
        bidirectionalClass,
        decompositionClass,
        ...props
    }) {
        super(props);
        this._value = value;
        this._category = category;
        this._combiningClass = combiningClass;
        this._bidirectionalClass = bidirectionalClass;
        this._decompositionClass = decompositionClass;
    }
}
