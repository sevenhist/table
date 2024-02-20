import { Header } from 'components/Header';
import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

interface MainLayoutProps { }

export const MainLayout: FC<MainLayoutProps> = () => {

    return (
        <div>
            <Header/>
            <Outlet />
        </div>
    );
};
