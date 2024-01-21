import { PaginationSelectedItem } from "components/ui/Pagination";
import { useState } from "react";

interface UsePagination {
    array: Array<any>,
    itemsPerPage?: number
}

export const usePagination = ({array, itemsPerPage = 16}: UsePagination) => {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = array.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(array.length / itemsPerPage);

    const handlePageClick = (selectedItem: PaginationSelectedItem) => {
        const newOffset = (selectedItem.selected * itemsPerPage) % array.length;
        console.log(
            `User requested page number ${selectedItem.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    return {
        handlePageClick: handlePageClick,
        slicedArray: currentItems,
        pageCount: pageCount
    }
}