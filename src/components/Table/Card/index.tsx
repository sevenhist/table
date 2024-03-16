import { FC } from "react"
import s from "./Cart.module.scss"

export interface Card {
    title: string,
    logo: string,
    price: string,
    activeCard: boolean
}

export const Card: FC<Card> = ({title, logo, price, activeCard}) => {
    return (
        <div className={`${activeCard ? s.main__block_active : ''} ${s.main__block}`}>
            <div className={`${activeCard ? s.main__block_text_and_logo_active : ''} ${s.main__block_text_and_logo}`}>
                <p>{title}</p>
                <img src={logo} />
            </div>
            <p className={s.main__price}>{price}</p>
        </div>
    )
}