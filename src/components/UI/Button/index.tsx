import { FC, ReactNode } from 'react';
import s from './Button.module.scss';
import { StringLiteral } from 'typescript';

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
    href: string
}

export const Button: FC<ButtonProps> = ({ children, className, onClick, variables }) => {
    return (
        <button onClick={onClick} className={`${className ? className : ''} ${s.button} ${variables ? s[variables] : ''}`}>{children}</button>
    )
}

export const LinkButton: FC<LinkButton> = ({children, href, className, variables}) => {
    return (
        <a href={href} className={`${className ? className : ''} ${s.button} ${variables ? s[variables] : ''}`}>{children}</a>
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
