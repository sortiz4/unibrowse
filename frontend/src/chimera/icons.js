import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

export class FaObject {
    constructor(...icons) {
        for(const icon of icons) {
            this[icon.iconName] = {
                width: icon.icon[0],
                height: icon.icon[1],
                path: icon.icon[4],
            };
        }
    }
}

export class FaIcon {
    static solid = new FaObject(
        faChevronLeft,
        faChevronRight,
        faExclamationCircle,
        faQuestionCircle,
        faSpinner,
    );

    static get(name) {
        if(name in this.solid) {
            return this.solid[name];
        }
        throw new TypeError(`'${name}' was not found`);
    }
}
