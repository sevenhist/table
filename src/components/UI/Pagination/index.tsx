import { FC, useEffect, useState } from 'react';
import s from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { useLocation, useSearchParams } from 'react-router-dom';

export interface PaginationSelectedItem {
    selected: number
}

interface Pagination {
    handlePageClick: (selectedItem: PaginationSelectedItem) => void,
    pageCount?: number;
}

export const Pagination: FC<Pagination> = ({ handlePageClick, pageCount = 8 }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = searchParams.get('page')
    const onPageChange = (selectedItem: { selected: number }) => {
        setSearchParams({ page: `${selectedItem.selected + 1}` });
        handlePageClick(selectedItem);
    }

    return (
        <ReactPaginate
            initialPage={currentPage ? parseInt(currentPage) - 1 : 0}
            className={s.pagination}
            pageLinkClassName={s.pagination__button}
            activeLinkClassName={s.pagination__active_button}
            previousLinkClassName={s.pagination__previous__button}
            nextLinkClassName={s.pagination__next__button}
            breakLabel="..."
            nextLabel=">"
            onPageChange={onPageChange}
            pageRangeDisplayed={3} // кількість в діапазоні між останньою і першою  
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={1} // скільки виводиться в началі і в цінці 
        />
    )
}