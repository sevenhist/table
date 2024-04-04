import { useAppDispatch, useAppSelector } from "app/hooks"
import s from "./CartCheckout.module.scss"
import { changeCountOnInput, deleteCartProduct, discrementCount, incrementCount, selectCartProducts, selectCartTotalPriceOfProducts } from "features/user/cartSlice"
import { Link } from "react-router-dom"
import { ROUTES } from "app/routes"
import { FC, useState } from "react"

interface CartCheckoutProps {
    deleteItemId: string | null,
    setDeleteItemId: React.Dispatch<string | null>
}

export const CartCheckout: FC<CartCheckoutProps> = ({deleteItemId, setDeleteItemId}) => {
    const totalPrice = useAppSelector(selectCartTotalPriceOfProducts)
    const dispatch = useAppDispatch()
    const cartArray = useAppSelector(selectCartProducts)
    const showButtonDelete = (productId: string, e: React.MouseEvent<HTMLDivElement>) => {
        setDeleteItemId(productId)
        e.stopPropagation()
    }
    const handleChangeInputCart = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
        dispatch(changeCountOnInput({ productId, newCount: e.target.value }));
    };
    return (
        <div className={s.cart__checkout}>
            <h2 className={s.cart__checkout__title}>Кошик</h2>
            <ul className={s.cart__list}>
                {
                    cartArray.map((product) => {
                        return (
                            <li className={s.cart__item}>
                                <Link to={`${ROUTES.product}/${product.id}`} className={s.cart__item__img} key={product.id}>
                                    <img src={product.imgUrl} alt={product.title} />
                                </Link>
                                <Link to={`${ROUTES.product}/${product.id}`} className={s.cart__item__title}>
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
                        )
                    })
                }
            </ul>
            <div className={s.cart__checkout__total}>
                <p>Разом:</p>
                <span>{totalPrice} грн</span>
            </div>
        </div>
    )
}