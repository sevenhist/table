import { FC } from 'react';
import s from './CartModal.module.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { deleteCartProduct, discrementCount, incrementCount, selectCartProducts } from 'features/user/cartSlice';

interface CartModalProps {
    closeCartMenu: () => void
}

export const CartModal: FC<CartModalProps> = ({ closeCartMenu }) => {

    const dispatch = useAppDispatch();
    const cartArray = useAppSelector(selectCartProducts);

    return (
        <div className={s.modal}>
            <div onClick={closeCartMenu} className={s.modal__wraper}>
                <div onClick={(e) => { e.stopPropagation() }} className={s.modal__content}>
                    <div className={s.modal__content__top}>
                        <h1>Кошик</h1>
                        <button onClick={closeCartMenu} className={s.modal__content__close}>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M3,3 L21,21 M3,21 L21,3"></path></svg>
                        </button>
                    </div>
                    {
                        cartArray.map((product) => {
                            return (
                                <div className={s.product} key={product.id}>
                                    <img className={s.modal__content__image} src={product.imgUrl} alt={product.title} />
                                    <p>{product.title}</p>
                                    <p>{product.price} грн</p>
                                    <div>
                                        <button onClick={() => dispatch(incrementCount(product.id))}>Add</button>
                                        <div>{product.count}</div>
                                        <button onClick={() => dispatch(discrementCount(product.id))}>Minus</button>
                                        <button onClick={() => dispatch(deleteCartProduct(product.id))}>Delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
//stopPropagation() - всплитіє не работає при ньому 