import fontawesome from '@fortawesome/fontawesome';
import faChevronLeft from '@fortawesome/fontawesome-free-solid/faChevronLeft';
import faChevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight';
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle';
import faQuestionCircle from '@fortawesome/fontawesome-free-solid/faQuestionCircle';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {React} from 'chimera/react';

fontawesome.library.add(
    faChevronLeft, faChevronRight,
    faExclamationCircle, faQuestionCircle,
    faSpinner,
);

export function Icon({fw, ...props}) {
    return <FontAwesomeIcon fixedWidth={fw} {...props}/>;
}
