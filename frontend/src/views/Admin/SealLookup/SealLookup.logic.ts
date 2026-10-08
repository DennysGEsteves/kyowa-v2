import { useSealsSearchQuery } from "@/api/Seals/seals.query";
import { routes } from "@routes";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { getSealLookupTableColumns } from "./SealLookup.props";

export function SealLookupLogic() {
  const router = useRouter();
  const [numberInput, setNumberInput] = useState("");
  const [searchNumber, setSearchNumber] = useState<number | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const { data: results = [], isLoading, isFetching, isError } =
    useSealsSearchQuery(searchNumber, {
      enabled: hasSearched && searchNumber !== null,
    });

  const handleOpenSeal = useCallback(
    (sealId: string) => {
      router.push(routes.sealLookup.detail(sealId));
    },
    [router],
  );

  const columns = useMemo(
    () => getSealLookupTableColumns((item) => handleOpenSeal(item.id)),
    [handleOpenSeal],
  );

  const handleSearch = useCallback(() => {
    const trimmed = numberInput.trim();
    if (!trimmed) {
      setSearchNumber(null);
      setHasSearched(false);
      return;
    }

    const parsed = Number(trimmed);
    if (!Number.isInteger(parsed) || parsed < 1) {
      setSearchNumber(null);
      setHasSearched(true);
      return;
    }

    setSearchNumber(parsed);
    setHasSearched(true);
  }, [numberInput]);

  const invalidInput =
    hasSearched &&
    searchNumber === null &&
    numberInput.trim().length > 0;

  return {
    data: {
      numberInput,
      results,
      columns,
      hasSearched,
      invalidInput,
      isLoading,
      isFetching,
      isError,
    },
    methods: {
      setNumberInput,
      handleSearch,
      handleOpenSeal,
    },
  };
}
