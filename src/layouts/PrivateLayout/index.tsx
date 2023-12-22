import { useAppSelector } from 'app/hooks';
import { selectAuth } from 'features/user/userSlice';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateLayoutProps { }

export const PrivateLayout: FC<PrivateLayoutProps> = () => {
    const isAuth = useAppSelector(selectAuth)

    return (
        <>
            {isAuth ? <Outlet /> : <Navigate to={'/login'} />}
        </>
    );
};
