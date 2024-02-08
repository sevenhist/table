import { FC, useEffect, useRef } from "react"


export const SuperHeader: FC = () => {
    const headerRef  = useRef<HTMLHeadElement | null>(null)

    const widthHeader = headerRef.current?.scrollWidth
    const heightHeader = headerRef.current?.scrollHeight
    console.log(heightHeader, widthHeader)
    return (
        <header ref={headerRef}  style={{ width: '800px', height: '1200px', background: 'red' }}>
            <div>
            </div>
        </header>
    )
}