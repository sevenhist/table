import { type MutableRefObject, useEffect, useRef } from 'react'

const useClickOutside = (close?: () => void): MutableRefObject<any> => {
    const ref = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const handleClick = (event: Event) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                close && close()
            }
        }

        document.addEventListener('click', handleClick, true)

        return () => {
            document.removeEventListener('click', handleClick, true)
        }
    }, [ref, close])

    return ref
}

export default useClickOutside
