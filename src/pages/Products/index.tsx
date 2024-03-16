import { useAppDispatch, useAppSelector } from "app/hooks"
import { Pagination } from "components/ui/Pagination"
import { fetchOneCategory, fetchProduct, fetchProducts, selectOneCategory, selectOneProduct, selectProducts } from "features/user/shopSlice"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { usePagination } from "shared/hooks/usePagination"
import s from './Products.module.scss';
import { Container } from "components/ui/Container"
import { IProduct } from "models/IProduct"
import { Button } from "components/ui/Button"
import { addProductToCart, selectCartProducts } from "features/user/cartSlice"
import { Product } from "./Product"
import { ROUTES } from "app/routes"
import { CartModal } from "components/CartModal"
import { useLockedBody } from "hooks/useScrollLock"


export const Products = () => {
    const { categoryId } = useParams()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchProducts(categoryId as string))
        dispatch(fetchOneCategory(categoryId as string))
    }, [])
    const [visibleCartMenu, setVisibleCartMenu] = useState(false);
    const [locked, setLocked] = useLockedBody(false, 'root')

    const products = useAppSelector(selectProducts)
    const category = useAppSelector(selectOneCategory)
    const itemsPerPage = 32
    const result = usePagination({ array: products, itemsPerPage })

    const changeVisibleCart = () => {
        setVisibleCartMenu(!visibleCartMenu)
    }
    const addProductInCart = (product: IProduct) => {
        dispatch(addProductToCart(product))
        setVisibleCartMenu(!visibleCartMenu)
        setLocked(!locked)
    }
    const closeCartMenu = () => {
        setVisibleCartMenu(false)
        setLocked(false);
    }

    return (
        <div className={s.products}>
            <Container>
                <h2 className={s.products__title}>{category?.title}</h2>
                <ul className={s.products__list}>
                    {
                        result.slicedArray.map((product: IProduct) => {
                            return (
                                <div className={s.productInfoContainer} key={product.id}>
                                    <Link to={`${ROUTES.product}/${product.id}`} className={s.products__list__item}>
                                        <div className={s.products__list__actions}>
                                            <div className={`${s.products__list__action} ${s.products__list__action__sale}`}>
                                                Акція -50%
                                            </div>
                                            <div className={`${s.products__list__action} ${s.products__list__action__top}`}>
                                                Топ продажу
                                            </div>
                                        </div>
                                        <a className={s.products__list__img} href={product.id}>
                                            <img className={s.products__list__image} src={product.imgUrl} alt={product.title} />
                                        </a>
                                        <a className={s.products__list__title}>
                                            <span>{product.title}</span>
                                        </a>
                                        <div className={s.products__list__info}>
                                            <a>{product.description}</a>
                                        </div>
                                        <div className={s.products__list__box}>
                                            <div className={`${s.products__list__rating} ${s.rating}`}>
                                                <span className={`${s.rating__star} ${s.rating__star_active}`}></span>
                                                <span className={`${s.rating__star} ${s.rating__star_active}`}></span>
                                                <span className={`${s.rating__star} ${s.rating__star_active}`}></span>
                                                <span className={`${s.rating__star} ${s.rating__star_active}`}></span>
                                                <span className={s.rating__star}></span>
                                            </div>
                                            <a href="#" className={s.products__list__response}>
                                                Написати відгук
                                            </a>
                                        </div>
                                        <div className={s.products__list__prices}>
                                            <div className={`${s.products__list__price} ${s.products__list__price__old}`}>
                                                {parseInt(product.price) * 2} ₴
                                            </div>
                                            <div className={`${s.products__list__price} ${s.products__list__price__new}`}>
                                                {product.price} ₴
                                            </div>
                                        </div>
                                    </Link>
                                    <Button onClick={() => { addProductInCart(product) }} className={s.products__list__btn}>Купити</Button>
                                </div>
                            )
                        })
                    }
                </ul>
                {
                    products.length > itemsPerPage && <Pagination handlePageClick={result.handlePageClick} pageCount={result.pageCount} />
                }
            </Container>
            <CartModal closeCartMenu={closeCartMenu} visibleCartMenu={visibleCartMenu} />
        </div>
    )
}