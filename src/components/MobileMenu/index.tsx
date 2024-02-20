import { useAppSelector } from 'app/hooks'
import s from './MobileMenu.module.scss'
import { Logo } from 'components/Logo'
import { FC, useEffect, useRef } from 'react'
import { selectAuth, selectUser } from 'features/user/userSlice'
import { Link } from 'react-router-dom'
import { UserAvatar } from 'components/UserAvatar'
import { ROUTES } from 'app/routes'
import { LinkButton } from 'components/ui/Button'
import Transition from 'components/Transition'
import useScrollLock from 'hooks/useScrollLock'

interface MobileMenuProps {
    onCloseMobileMenu: () => void,
    isActiveMobileMenu: boolean,
    changeVisibleHeader: () => void
}

export const MobileMenu: FC<MobileMenuProps> = ({ onCloseMobileMenu, isActiveMobileMenu, changeVisibleHeader }) => {

    const isAuth = useAppSelector(selectAuth)
    const user = useAppSelector(selectUser)
    //split("@") create from string array with 2 parts['sevenhist', 'gmail.com']

    const list1 = [
        "Дропшипінг",
        "Доставка | Оплата",
        "Гарантія | Повернення" ,
        "Графік роботи | Контакти" 
    ]

    const list2 = [
        "Онлайн-консультант" ,
        "Бот центр | Чат" 
    ]

    return (
        <Transition isOpen={isActiveMobileMenu} classNames={{
            entered: s.entered,
            entering: s.entering,
            exiting: s.exiting,
            exited: s.exited
        }} unMountOnExited={true}>
        <div onClick={onCloseMobileMenu} className={`${s.modal}`}>
            <aside className={`${s.navbar}`}>
                <div className={s.navbar__wrapper}>
                    <div className={s.navbar__top}>
                        <button onClick={onCloseMobileMenu} className={s.navbar__close}>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M3,3 L21,21 M3,21 L21,3"></path></svg>
                        </button>
                        <Logo onClick={onCloseMobileMenu} className={s.navbar__logo} withText={true} adaptiveText={false} />
                    </div>
                    <div className={s.navbar__body}>
                        {isAuth ? (
                            <Link onClick={onCloseMobileMenu} to={ROUTES.PRIVATE.cabinet} className={s.navbar__profile}>
                                <UserAvatar />
                                <p>{user?.email.split('@')[0]}</p>
                            </Link>
                        ) : (
                            <div className={s.navbar__enter}>
                                <Link onClick={changeVisibleHeader} to={ROUTES.AUTH.login} className={s.navbar__login}>
                                    Вхід
                                </Link>
                                <Link onClick={changeVisibleHeader} to={ROUTES.AUTH.registration} className={s.navbar__registration}>
                                    Реєстрація
                                </Link>
                            </div>
                        )}
                        <LinkButton onClick={onCloseMobileMenu} to={ROUTES.catalog} className={s.navbar__btn} withPicture={true}>
                            Каталог товарів
                        </LinkButton>
                        <ul className={s.navbar__list}>
                            <li className={s.navbar__item}>
                                <Link onClick={onCloseMobileMenu} to={ROUTES.home} className={s.navbar__link} >
                                    Акції
                                </Link>
                            </li>
                            {list1.map((item) => <li className={s.navbar__item}>
                                <a className={s.navbar__link} href='#'>
                                    {item}
                                </a>
                            </li>)}
                        </ul>
                        <ul className={s.navbar__list}>
                            {list2.map((item) => <li className={s.navbar__item}>
                                <a className={s.navbar__link} href='#'>
                                    {item}
                                </a>
                            </li>)}
                        </ul>
                    </div>
                </div>
            </aside>
        </div>
        </Transition>
    )
}