import { useAppSelector } from 'app/hooks';
import { selectAuth } from 'features/user/userSlice';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface AuthLayoutProps { }

export const AuthLayout: FC<AuthLayoutProps> = () => {
    const isAuth = useAppSelector(selectAuth)

    return (
        <>
            {!isAuth ? <Outlet /> : <Navigate to={'/cabinet'} />}
        </>
    );
};
