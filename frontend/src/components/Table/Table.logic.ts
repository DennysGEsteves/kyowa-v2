/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import type { TableComponentType } from "./Table.props";

export const useLogic = (props: TableComponentType) => {
  const [search, setSearch] = useState("");
  const [searchItems, setSearchItems] = useState<Record<string, any>[]>([]);
  const [page, setPage] = useState(1);

  const disableNextPageBtn = !!(
    props.pagination?.totalPages && page >= props.pagination?.totalPages
  );

  const disablePreviousPageBtn = !!(props.pagination?.totalPages && page === 1);

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const seachValue = e.target.value;
    setSearch(seachValue);

    if (seachValue.length > 2) {
      if (props.onSearch) {
        props.onSearch(e.target.value);
      } else {
        const newSearchItems = props.items.filter(
          (item: Record<string, any>) => {
            const found = props.searchKeys?.some((key) => {
              // console.log(item[key].toLowerCase(), seachValue.toLowerCase());
              return item[key].toLowerCase().includes(seachValue.toLowerCase());
            });

            return found;
          },
        );

        setSearchItems(newSearchItems);
      }
    } else {
      setSearchItems(props.items);
    }
  }

  function onNextPage() {
    const newPage = page + 1;
    setPage(newPage);
    props.pagination?.onPageChange(newPage);
  }

  function onPreviousPage() {
    const newPage = page - 1;
    setPage(newPage);
    props.pagination?.onPageChange(newPage);
  }

  useEffect(() => {
    setSearchItems(props.items);
  }, [props.items]);

  return {
    data: {
      search,
      tableItems: searchItems,
      pagination: {
        page,
        disableNextPageBtn,
        disablePreviousPageBtn,
        totalPages: props.pagination?.totalPages,
      },
    },
    methods: {
      setSearch,
      handleSearch,
      onNextPage,
      onPreviousPage,
    },
  };
};
