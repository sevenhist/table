import { FC } from "react"
import s from "./Title.module.scss"

interface TitleProps {
    children: string,
    className?: string
}

export const Title:FC<TitleProps> = ({children, className}) => {
    return (
        <div className={`${className ? className : ''} ${s.title}`}>
            {children}
        </div>
    )
}