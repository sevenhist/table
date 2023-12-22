import { FC, ReactNode } from 'react';
import s from './Button.module.scss';
import { StringLiteral } from 'typescript';

interface ButtonProps {
    children: ReactNode; // принмае елемент НЕ СТРИНГ!!!
    className?: string
}

interface ButtonLinkProps {
    children: ReactNode;    
    className?: string;
    href: string;
}

export const RedButton: FC<ButtonProps> = ({ children, className }) => {
    return (
        <button className={`${className ? className : ''} ${s.button_red}`}>{children}</button>
    )
}

export const RedLinkButton: FC<ButtonLinkProps> = ({ children, href, className }) => {
    return (
        <a href={href} className={`${className ? className : ''} ${s.button_red}`}>{children}</a>
    )
}