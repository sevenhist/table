import { FC } from "react";
import s from "./Logo.module.scss";
import logo from 'img/icons/logo.png'
import { Link } from "react-router-dom";
import { ROUTES } from "app/routes";

interface LogoProps {
    withText?: boolean,
    className?: string
}

export const Logo: FC<LogoProps> = ({ withText = true, className }) => {
    return (
        <Link to={ROUTES.home} className={`${className ? className : ''} ${s.logo}`}>
            <img className={s.logo__icon} src={logo} alt="Logo" />
            {withText ? <p className={s.logo__text}>Coffee Import</p> : ''}
        </Link>
    )
}