import { useEffect, useState } from "react";

const useScrollLock = () => {
    const [isLocked, setIsLocked] = useState(false)

    useEffect(() => {
        document.body.style.overflow = isLocked ? 'hidden' : ''
    }, [isLocked])

    return { isLocked, setIsLocked }
}

export default useScrollLock;