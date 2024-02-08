import { FC, useEffect, useState } from 'react';
import s from './NavigationProduct.module.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ROUTES } from 'app/routes';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchProduct, selectOneProduct } from 'features/user/shopSlice';
import { Container } from 'components/ui/Container';

export const NavigationProduct: FC = () => {

    const { id } = useParams()
    const dipsatch = useAppDispatch()
    useEffect(() => {
        dipsatch(fetchProduct(id as string))
    }, []) // позволяет указывать функцию, которая будет запущена после того, как React обновит DOM(сайт)
    const product = useAppSelector(selectOneProduct)
    //adding to Link activeclassName
    const { pathname } = useLocation();

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");
    const links = [
        {
            url: ROUTES.productInfo.information,
            text: "Усе про товар"
        },
        {
            url: ROUTES.productInfo.characteristics,
            text: "Характеристики"
        },
        {
            url: ROUTES.productInfo.comments,
            text: "Відгуки"
        },
        {
            url: ROUTES.productInfo.delivery,
            text: "Доставка і оплата"
        }
    ]
    return (
        <Container>
            <nav className={`${s.product__nav} ${s.nav_product}`}>
                <ul className={s.nav_product__list}>
                    {
                        links.map((link) => {
                            return (
                                <li>
                                    <Link to={`${ROUTES.product}/${product?.id}${link.url}`} 
                                    className={`${splitLocation.includes(link.url.slice(1)) ? s.nav_product__btn__active : '' } ${s.nav_product__btn}`}
                                    >{link.text}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </Container>
    )
}