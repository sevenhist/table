import { FC, ReactNode } from 'react';
import s from './Button.module.scss';
import { StringLiteral } from 'typescript';
import { Link } from 'react-router-dom';
import { ROUTES } from 'app/routes';

interface ButtonRedProps {
    children: ReactNode; 
    className?: string
}

interface ButtonLinkProps {
    children: ReactNode;    
    className?: string;
    href: string;
}

interface ButtonProps {
    children: ReactNode,
    className?: string,
    onClick?: () => void,
    variables?: "fitContent",
    type?: string
}

interface LinkButton {
    children: ReactNode,
    className?: string,
    variables?: "fitContent",
    to: string,
    withPicture?: boolean,
    onClick?: () => void
}

export const Button: FC<ButtonProps> = ({ children, className, onClick, variables }) => {
    return (
        <button onClick={onClick} className={`${className ? className : ''} ${s.button} ${variables ? s[variables] : ''}`}>{children}</button>
    )
}

export const LinkButton: FC<LinkButton> = ({children, to, className, variables, withPicture, onClick}) => {
    return (
        <Link onClick={onClick} to={to} className={`${className ? className : ''} ${s.button} ${variables ? s[variables] : ''}`}>
            {withPicture && <svg className={s.button__icon} viewBox="0 0 24 24" fill="currentColor" id="icon-catalog"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m17 2.75735-4.2427 4.24264 4.2427 4.24261 4.2426-4.24261zm-5.6569 2.82843c-.7811.78104-.7811 2.04738 0 2.82842l4.2426 4.2427c.7811.781 2.0475.781 2.8285 0l4.2426-4.2427c.781-.78104.781-2.04738 0-2.82842l-4.2426-4.24264c-.781-.781048-2.0474-.781048-2.8285 0z"></path><path d="m7 4h-4c-.55228 0-1 .44772-1 1v4c0 .5523.44772 1 1 1h4c.55228 0 1-.4477 1-1v-4c0-.55228-.44772-1-1-1zm-4-2c-1.65685 0-3 1.34315-3 3v4c0 1.6569 1.34315 3 3 3h4c1.65685 0 3-1.3431 3-3v-4c0-1.65685-1.34315-3-3-3z"></path><path d="m7 16h-4c-.55228 0-1 .4477-1 1v4c0 .5523.44772 1 1 1h4c.55228 0 1-.4477 1-1v-4c0-.5523-.44772-1-1-1zm-4-2c-1.65685 0-3 1.3431-3 3v4c0 1.6569 1.34315 3 3 3h4c1.65685 0 3-1.3431 3-3v-4c0-1.6569-1.34315-3-3-3z"></path><path d="m19 16h-4c-.5523 0-1 .4477-1 1v4c0 .5523.4477 1 1 1h4c.5523 0 1-.4477 1-1v-4c0-.5523-.4477-1-1-1zm-4-2c-1.6569 0-3 1.3431-3 3v4c0 1.6569 1.3431 3 3 3h4c1.6569 0 3-1.3431 3-3v-4c0-1.6569-1.3431-3-3-3z"></path></g></svg>}
            {children}
        </Link>
    )
}

export const RedButton: FC<ButtonRedProps> = ({ children, className }) => {
    return (
        <button className={`${className ? className : ''} ${s.button_red}`}>{children}</button>
    )
}

export const RedLinkButton: FC<ButtonLinkProps> = ({ children, href, className }) => {
    return (
        <a href={href} className={`${className ? className : ''} ${s.button_red}`}>{children}</a>
    )
}
