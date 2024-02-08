import { Container } from "components/ui/Container"
import { FC } from "react"
import { NavigationProduct } from "../NavigationProduct"
import s from './Comments.module.scss';

export const Comments: FC = () => {
    return (
        <Container>
            <h1 className={s.text}>Тут будуть відгуки</h1>
        </Container>
    )
}