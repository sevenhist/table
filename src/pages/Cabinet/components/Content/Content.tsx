import { FC } from "react"
import { SideBar } from "./SideBar/SideBar"
import s from './Content.module.scss';
import { ROUTES } from "app/routes";
import { Outlet } from "react-router-dom";

export const Content: FC = () => {
    return (
        <div className={s.cabinet}>
            <div className={s.cabinet__container}>
                <SideBar />
                <div className={s.cabinet__content}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}