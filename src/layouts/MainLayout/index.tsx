import { Header } from 'components/Header';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

interface MainLayoutProps { }

export const MainLayout: FC<MainLayoutProps> = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};
