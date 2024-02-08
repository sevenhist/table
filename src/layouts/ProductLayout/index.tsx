import { NavigationProduct } from 'pages/Products/Product/NavigationProduct';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const ProductLayout: FC = () => {
    return (
        <>
            <NavigationProduct />
            <Outlet />
        </>
    );
};
