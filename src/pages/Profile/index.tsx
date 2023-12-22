import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectUser, setAuth, setUser } from 'features/user/userSlice';
import { Container } from 'components/UI/Container';
import { toast } from 'react-toastify';
import AuthService from 'api/services/AuthService';

import s from './Profile.module.scss';

interface ProfileProps { }

export const Profile: FC<ProfileProps> = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)

    const handleLogout = async () => {
        try {
            await AuthService.logout()
            localStorage.removeItem('token')
            dispatch(setAuth(false));
            dispatch(setUser(null))
            toast("Success Logout", {
                type: "success"
            });
        } catch (e: any) {
            console.log(e.response?.data?.message)
            toast(e.response?.data?.message, {
                type: "error"
            });
        }
    }

    return (
        <div className={s.profile}>
            <Container>
                Profile
                {user && (
                    <div>
                        <p>Email: {user.email}</p>
                    </div>
                )}
                <div><button className={s.profile_logout} onClick={handleLogout}>Logout</button></div>
            </Container>
        </div>
    );
};
