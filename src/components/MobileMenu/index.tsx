import s from './MobileMenu.module.scss'
import { Logo } from 'components/Logo'
import { FC } from 'react'

interface MobileMenuProps {
    onClose: () => void,
    isActive: boolean
}

export const MobileMenu: FC<MobileMenuProps> = ({onClose, isActive}) => {

    return (
        <aside className={`${isActive ? s.navbar__active : ''} ${s.navbar}`}>
            <div className={s.navbar__wrapper}>
                <div className={s.navbar__top}>
                    <button onClick={onClose} className={s.navbar__close}>
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M3,3 L21,21 M3,21 L21,3"></path></svg>
                    </button>
                    <Logo></Logo>
                </div>
                <div>
                    
                </div>
            </div>
        </aside>
    )
}