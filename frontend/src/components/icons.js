import {FaIcon} from 'chimera/icons';
import {React} from 'chimera/react';
import {classNames} from 'chimera/string';

export function Icon({name, size, spin, wide, className, ...props}) {
    const {width, height, path} = FaIcon.get(name);
    return (
        <svg
            {...props}
            role="img"
            width={size}
            height={size}
            viewBox={`0 0 ${width} ${height}`}
            className={classNames(
                !size && 'fa',
                spin && 'fa-spin',
                wide && 'fa-wide',
                className,
            )}
        >
            <path fill="currentColor" d={path}/>
        </svg>
    );
}
