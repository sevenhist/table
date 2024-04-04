import { FC, useState } from "react";
import s from './UserComponent.module.scss';
import { PasswordsComponent } from "./PasswordsComponent";
import { InformationComponent } from "./InformationComponent";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectUser } from "features/user/userSlice";


export const UserComponent: FC = () => {

    const [activePasswordButton, setActivePasswordButton] = useState(false)
    const user = useAppSelector(selectUser)
    return (
        <div className={s.settings}>
            { 
                !user?.isActivated &&
                <div className={s.settings__warning}>
                    <i><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg></i>
                    <p>Необхідно здійснити <a href="http://mail.google.com/mail/." target="_blank" rel="noreferrer">активацію</a> облікового запису.</p>
                </div>
            }
            {
                activePasswordButton
                    ?
                    <PasswordsComponent setActivePasswordButton={setActivePasswordButton} />
                    :
                    <InformationComponent setActivePasswordButton={setActivePasswordButton} />
            }
        </div>
    )
}