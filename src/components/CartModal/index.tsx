import { FC, useEffect, useState } from 'react';
import s from './CartModal.module.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ICartProduct, changeCountOnInput, deleteCartProduct, discrementCount, incrementCount, resetCountOnInput, selectCartProducts, selectCartTotalPriceOfProducts } from 'features/user/cartSlice';
import { Link, NavLink, useParams } from 'react-router-dom';
import { ROUTES } from 'app/routes';
import { IProduct } from 'models/IProduct';
import { Button, LinkButton } from 'components/ui/Button';

interface CartModalProps {
    closeCartMenu: () => void,
    visibleCartMenu: boolean
}

export const CartModal: FC<CartModalProps> = ({ closeCartMenu, visibleCartMenu }) => {

    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const cartArray = useAppSelector(selectCartProducts);
    const totalPriceOfProducts = useAppSelector(selectCartTotalPriceOfProducts);
    const handleChangeInputCart = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
        dispatch(changeCountOnInput({ productId, newCount: e.target.value }));
    };
    const onCartClick = () => {
        dispatch(resetCountOnInput())
        setDeleteItemId(null)
    }
    const showButtonDelete = (productId: string, e: React.MouseEvent<HTMLDivElement>) => {
            setDeleteItemId(productId)
            e.stopPropagation()
    }
    return (
        <div className={`${visibleCartMenu ? s.modal : s.modal__hidden}`} onClick={onCartClick}>
            <div onClick={closeCartMenu} className={s.modal__wraper}>
                <div onClick={(e) => e.stopPropagation()} className={s.modal__content}>
                    <div className={s.modal__content__top} onClick={onCartClick}>
                        <h1>Кошик</h1>
                        <button onClick={closeCartMenu} className={s.modal__content__close}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="2" d="M3,3 L21,21 M3,21 L21,3"></path></svg>
                        </button>
                    </div>
                    { cartArray.length > 0 ?
                        <div className={s.body__basket__window__cont} onClick={onCartClick}>
                                            <div className={s.body__basket__window__wrapper}>
                                                {
                                                    cartArray.map((product) => {
                                                        return (
                                                            <div key={product.id} className={`${s.basket__window__body} ${s.body__basket__window}`}>
                                                                <ul className={s.cart__list}>
                                                                    <li className={s.cart__item}>
                                                                        <Link to={`${ROUTES.product}/${product.id}`} className={s.cart__item__img} onClick={closeCartMenu} key={product.id}>
                                                                            <img src={product.imgUrl} alt={product.title} />
                                                                        </Link>
                                                                        <Link to={`${ROUTES.product}/${product.id}`} onClick={closeCartMenu} className={s.cart__item__title}>
                                                                            {product.title}
                                                                        </Link>
                                                                        <div className={s.cart__item__form}>
                                                                            <button onClick={() => dispatch(discrementCount(product.id))} className={`${(product.count ?? 0) < 2 && s.disable} ${s.cart__item__increase}`}>-</button>
                                                                            <input className={s.cart__item__quantity} type='text' value={product.count ?? ''} onChange={(e) => handleChangeInputCart(e, product.id)} onFocus={(e) => e.target.select()} />
                                                                            <button onClick={() => dispatch(incrementCount(product.id))} className={`${(product.count ?? 0) === 100000 && s.disable} ${s.cart__item__increase}`}>+</button>
                                                                        </div>
                                                                        <p className={s.cart__item__price}>{product.totalPriceOfProduct} грн</p>
                                                                        <div className={s.cart__item__more} onClick={(e) => showButtonDelete(product.id, e)}>
                                                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                                                            <button className={`${deleteItemId === product.id && s.cart__item__delete__show} ${s.cart__item__delete}`} onClick={() => dispatch(deleteCartProduct(product.id))}>
                                                                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zM9 4v2h6V4H9z"></path></g></svg>
                                                                                <span>Видалити</span>
                                                                            </button>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div className={`${s.basket__window__footer} ${s.footer__basket__window}`}>
                                                    <div className={s.footer__basket__window__top}>
                                                        <p className={s.footer__basket__window__all}>Разом: </p>
                                                        <span className={s.footer__basket__window__current}>{totalPriceOfProducts} грн</span>
                                                    </div>
                                                    <div className={s.footer__basket__window__box}>
                                                        <LinkButton to={ROUTES.checkout} className={s.footer__basket__window__btn} onClick={closeCartMenu}>
                                                            Офорити замовлення
                                                        </LinkButton>
                                                    </div>
                                                    <div className={s.footer__basket__window__contbox}>
                                                        <button onClick={closeCartMenu} className={s.footer__basket__window__continue}>
                                                            Продовжити покупки
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                        </div>
                    : 
                        <div className={s.basket__window__noItems}>
                            <p className={s.basket__window__noItems__text}>Кошик порожній</p>
                            <Button className={s.basket__window__noItems__continue} onClick={closeCartMenu}>Продовжити покупки</Button>
                        </div>    
                    }
                </div>
            </div>
        </div>
    )
}
//stopPropagation() - всплитіє не работає при ньому 