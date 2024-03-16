import React, { MutableRefObject, SetStateAction, useEffect, useRef } from 'react';


const useOutsideClick = (props: { callback: () => void }): MutableRefObject<any> => {

    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                props.callback();
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [props.callback]);

    return ref;
};

export default useOutsideClick;
