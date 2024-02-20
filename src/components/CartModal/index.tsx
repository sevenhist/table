import { FC } from 'react';
import s from './CartModal.module.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { deleteCartProduct, discrementCount, incrementCount, selectCartProducts } from 'features/user/cartSlice';
import { Link, NavLink, useParams } from 'react-router-dom';
import { ROUTES } from 'app/routes';

interface CartModalProps {
    closeCartMenu: () => void,
    visibleCartMenu: boolean
}

export const CartModal: FC<CartModalProps> = ({ closeCartMenu, visibleCartMenu }) => {

    const dispatch = useAppDispatch();
    const cartArray = useAppSelector(selectCartProducts);

    return (
        <div className={visibleCartMenu ? s.modal : s.modal__hidden}>
            <div onClick={closeCartMenu} className={s.modal__wraper}>
                <div onClick={(e) => e.stopPropagation()} className={s.modal__content}>
                    <div className={s.modal__content__top}>
                        <h1>Кошик</h1>
                        <button onClick={closeCartMenu} className={s.modal__content__close}>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M3,3 L21,21 M3,21 L21,3"></path></svg>
                        </button>
                    </div>
                    <div className={s.body__basket__window__cont}>
                        <div className={s.body__basket__window__wrapper}>
                            {
                                cartArray.map((product) => {
                                    return (
                                        <div className={`${s.basket__window__body} ${s.body__basket__window}`}>
                                            <ul className={s.cart__list}>
                                                <li className={s.cart__item}>
                                                    <Link to={`${ROUTES.product}/${product.id}`} onClick={closeCartMenu} key={product.id}>
                                                        <img className={s.cart__item__img} src={product.imgUrl} alt={product.title} />
                                                    </Link>
                                                    <Link to={`${ROUTES.product}/${product.id}`} className={s.cart__item__title}>
                                                        <p>{product.title}</p>
                                                    </Link>
                                                    <div className={s.cart__item__form}>
                                                        <button onClick={() => dispatch(discrementCount(product.id))} className={`${product.count < 2 && s.disable} ${s.cart__item__increase}`}>-</button>
                                                        <input className={s.cart__item__quantity} type='number' value={product.count} />
                                                        <button onClick={() => dispatch(incrementCount(product.id))}>+</button>
                                                        <button onClick={() => dispatch(deleteCartProduct(product.id))}>Delete</button>
                                                    </div>
                                                    <div>{product.totalPrice}</div>
                                                    <p>{product.price} грн</p>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
//stopPropagation() - всплитіє не работає при ньому 