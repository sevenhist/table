import { Link } from "react-router-dom";
import s from "./Header.module.scss";
import { useState } from "react";
import { useAppSelector } from "app/hooks";
import { UserAvatar } from "components/UserAvatar";
import { selectAuth } from "features/user/userSlice";
import { ROUTES } from "app/routes";
import { Logo } from "components/Logo";
import { Button, LinkButton } from "components/ui/Button";

export const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [visibleHeader, setVisibleHeader] = useState(true);
  const changeVisibleHeader = () => {
    setVisibleHeader(false);
  }
  const isAuth = useAppSelector(selectAuth)

  const menuOpen = () => {
    setIsActive(!isActive);
  }
  return (
      <header className={visibleHeader ?  s.header : s.header_not_visible}>
        <div className={`${s.header__menu} ${s.menu}`}>
          <button onClick={menuOpen} type="button" className={`${s['icon-menu']} ${isActive ? s['menu-open'] : ''}`}><span></span></button>
          <Logo className={s.icon__logo} />
          <LinkButton to={ROUTES.catalog} variables="fitContent" className={s.buttonCatalog}>
            <svg className={s.menu__catalog__icon} viewBox="0 0 24 24" fill="currentColor" id="icon-catalog"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m17 2.75735-4.2427 4.24264 4.2427 4.24261 4.2426-4.24261zm-5.6569 2.82843c-.7811.78104-.7811 2.04738 0 2.82842l4.2426 4.2427c.7811.781 2.0475.781 2.8285 0l4.2426-4.2427c.781-.78104.781-2.04738 0-2.82842l-4.2426-4.24264c-.781-.781048-2.0474-.781048-2.8285 0z"></path><path d="m7 4h-4c-.55228 0-1 .44772-1 1v4c0 .5523.44772 1 1 1h4c.55228 0 1-.4477 1-1v-4c0-.55228-.44772-1-1-1zm-4-2c-1.65685 0-3 1.34315-3 3v4c0 1.6569 1.34315 3 3 3h4c1.65685 0 3-1.3431 3-3v-4c0-1.65685-1.34315-3-3-3z"></path><path d="m7 16h-4c-.55228 0-1 .4477-1 1v4c0 .5523.44772 1 1 1h4c.55228 0 1-.4477 1-1v-4c0-.5523-.44772-1-1-1zm-4-2c-1.65685 0-3 1.3431-3 3v4c0 1.6569 1.34315 3 3 3h4c1.65685 0 3-1.3431 3-3v-4c0-1.6569-1.34315-3-3-3z"></path><path d="m19 16h-4c-.5523 0-1 .4477-1 1v4c0 .5523.4477 1 1 1h4c.5523 0 1-.4477 1-1v-4c0-.5523-.4477-1-1-1zm-4-2c-1.6569 0-3 1.3431-3 3v4c0 1.6569 1.3431 3 3 3h4c1.6569 0 3-1.3431 3-3v-4c0-1.6569-1.3431-3-3-3z"></path></g></svg>
            <span>Каталог</span>
          </LinkButton>
          <div className={s.menu__search}>
            <button className={s.menu__search__icon}>
              <img src="https://plesh9.github.io/coffe-import/static/media/search.46f83f6bbf60bc904bb85857bf65b5ea.svg" />
            </button>
            <input type="text" className={`${s.menu__search__input} ${s.search}`} placeholder="Пошук" />
            <button className={s.menu__search__button}><span>Знайти</span></button>
          </div>
          <div className={s.menu__right}>
            <button className={s.menu__right__button}>
              <img src="https://plesh9.github.io/coffe-import/static/media/basket.58667f9ab914ba96bbda9ab2cdd754a3.svg" alt="Image" />
            </button>
            {isAuth ? (
              <Link to={ROUTES.PRIVATE.cabinet} className={s.menu__right__profile}>
                <UserAvatar />
              </Link>
            ) : (
              <Link onClick={changeVisibleHeader} to={ROUTES.AUTH.login} className={s.menu__right__profile}>
                <svg className={s.menu__right__profile__logo} fill="#000000" width="800px" height="800px" viewBox="0 0 128 128" id="Layer_1" version="1.1"><g><path d="M30,49c0,18.7,15.3,34,34,34s34-15.3,34-34S82.7,15,64,15S30,30.3,30,49z M90,49c0,14.3-11.7,26-26,26S38,63.3,38,49   s11.7-26,26-26S90,34.7,90,49z"></path><path d="M24.4,119.4C35,108.8,49,103,64,103s29,5.8,39.6,16.4l5.7-5.7C97.2,101.7,81.1,95,64,95s-33.2,6.7-45.3,18.7L24.4,119.4z"></path></g></svg>
              </Link>
            )}
          </div>
        </div>
      </header>
  );
}
