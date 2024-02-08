import { Container } from 'components/ui/Container';
import s from './Catalog.module.scss';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchCategories, selectCategories } from 'features/user/shopSlice';
import { Link } from 'react-router-dom';
import { ROUTES } from 'app/routes';
import ReactPaginate from 'react-paginate';
import { Pagination, PaginationSelectedItem } from 'components/ui/Pagination';
import { usePagination } from 'shared/hooks/usePagination';


interface Catalog { }

export const Catalog: FC<Catalog> = () => {
    const dispatch = useAppDispatch();
    
    const categories = useAppSelector(selectCategories)
    useEffect(() => {
        dispatch(fetchCategories())
    }, []) // якщо другий параметр в useEffect це пусти масів [], то функція перед пустим масівом буде відображатися лише один раз 

    const result = usePagination({array: categories, itemsPerPage: 32})

    return (
        <div className={s.categories}>
            <Container>
                <div className={`${s.productList__title} ${s.title}`}>
                    Кавове обладнання
                </div>
                <ul className={s.category_list}>
                    {result.slicedArray.map(category => {
                        return (
                            <li key={category.id} className={s.items__main__item}>
                                <Link to={`${ROUTES.catalog}/${category.id}`} className={s.items__main__link}>
                                    <div className={s.items__main__link__img}>
                                        <img src={category.imgUrl} alt={category.title} />
                                    </div>
                                    <p className={s.items__main__link__text}>{category.title}</p>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <Pagination handlePageClick={result.handlePageClick} pageCount={result.pageCount} />
            </Container>
        </div>
    )
}

interface PaginatedItems {
    itemsPerPage: number
}

