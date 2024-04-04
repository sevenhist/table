import { useAppDispatch, useAppSelector } from "app/hooks"
import { ROUTES } from "app/routes"
import { fetchLogout, selectUser } from "features/user/userSlice"
import { Link, Router, Routes, To, useLocation, useNavigate } from "react-router-dom"
import s from './SideBar.module.scss'
import { UserAvatar } from "components/UserAvatar"
import { FC } from "react"
import { LogoOfhistory } from "./PartOfMenu/Logo/LogoOfPart"
import { LogoOfDilers } from "./PartOfMenu/Logo/LogoOfDilers"
import { LogoOfConditions } from "./PartOfMenu/Logo/LogoOgConditions"
import { LogoOfSection } from "./PartOfMenu/Logo/LogoOfSection"
import { LogoOfExit } from "./PartOfMenu/Logo/LogoOfExit"
import { UserComponent } from "../MainCabinet/components/UserComponent/UserComponents"


export interface Part {
    title?: string,
    logo?: any,
    button?: () => void,
    route: string,
    routeComponent?: any,
    className?: string
}

export interface PartsArray {
    fields: Array<Part>
}

export const SideBar: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user = useAppSelector(selectUser)
    const location = useLocation()
    console.log("THIS IS MY URL",location.pathname);

    const handleLogout = async () => {
        dispatch(fetchLogout())
            .then(() => { navigate(ROUTES.home) })
    }
    
    const parts_of_menu: Array<Part> = [
        {
            title: user?.first_name,
            logo: <UserAvatar />,
            route: ROUTES.PRIVATE.personalInformation,
            className: s.profile__border
        },
        {
            title: 'Історія замовлень',
            logo: <LogoOfhistory />,
            route: ROUTES.PRIVATE.orders
        },
        {
            title: 'Дилерство',
            logo: <LogoOfDilers />,
            route: ROUTES.PRIVATE.dealership,
        },
        {
            title: 'Умови роботи',
            logo: <LogoOfConditions />,
            route: ROUTES.PRIVATE.conditions
        },
        {
            title: 'Розділ',
            logo: <LogoOfSection />,
            route: ROUTES.PRIVATE.applications
        },
    ];
    return (
        <div className={s.sidebar}>
            <ul className={s.sidebar__list}>
                {
                    parts_of_menu.map((part) => (       
                        <li className={`${part.className ? part.className : ''} ${s.sidebar__profile}`}>
                            <Link to={part.route ? part.route : ROUTES.home} className={`${location.pathname.includes(part.route) ? s.active : ''} ${s.sidebar__link}`} onClick={part.button}>
                                <div className={s.sidebar__logo}>{part.logo}</div>
                                <p>{part.title}</p>
                            </Link>
                        </li>
                    ))
                }
                <li className={s.sidebar__profile}>
                    <button className={s.sidebar__link} onClick={handleLogout}>
                        <div className={s.sidebar__logo}>{<LogoOfExit />}</div>
                        <p>Вийти</p>
                    </button>
                </li>
            </ul>
        </div>
    )
}
{/* {user && (
<div>
    <p>Email: {user.email}</p>
</div>
)} */}