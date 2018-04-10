import fontawesome from '@fortawesome/fontawesome';
import faChevronLeft from '@fortawesome/fontawesome-free-solid/faChevronLeft';
import faChevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {React} from 'chimera/react';

fontawesome.library.add(faChevronLeft, faChevronRight);

export function Icon({fw, ...props}) {
    return <FontAwesomeIcon fixedWidth={fw} {...props}/>;
}
