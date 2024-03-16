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

    const afterSecondElement = splitLocation.slice(3); // Ein neues Array ab dem dritten Element erstellen
    const isAllEmpty = afterSecondElement.every(element => element === ""); // Überprüfen, ob alle Elemente leer sind


    const links = [
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
                    <li>
                        <Link to={`${ROUTES.product}/${product?.id}`}
                            className={`${isAllEmpty ? s.nav_product__btn__active : ''} ${s.nav_product__btn}`}
                        >Усе про товар</Link>
                    </li>
                    {
                        links.map((link) => {
                            return (
                                <li key={link.url}>
                                    <Link to={`${ROUTES.product}/${product?.id}${link.url}`}
                                        className={`${splitLocation.includes(link.url.slice(1)) ? s.nav_product__btn__active : ''} ${s.nav_product__btn}`}
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