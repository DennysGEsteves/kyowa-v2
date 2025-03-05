/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import type { TableComponentType } from "./Table.props";

export const useLogic = (props: TableComponentType) => {
  const [search, setSearch] = useState("");
  const [searchItems, setSearchItems] = useState<Record<string, any>[]>([]);

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const seachValue = e.target.value;
    setSearch(seachValue);

    if (seachValue.length > 2) {
      if (props.onSearch) {
        props.onSearch(e.target.value);
      } else {
        const newSearchItems = props.data.filter(
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
      setSearchItems(props.data);
    }
  }

  useEffect(() => {
    setSearchItems(props.data);
  }, [props.data]);

  return {
    data: {
      search,
      tableItems: searchItems,
    },
    methods: {
      setSearch,
      handleSearch,
    },
  };
};
