import { useApi } from "@/api/api.hook";
import type { ProductLookupTab } from "@/api/ProductLookups";
import { useInvalidateProductLookupQuery } from "@/api/ProductLookups/product-lookups.query";
import type { ProductLookup } from "@entities";
import { useCallback, useEffect, useRef, useState } from "react";

export function useLookupTabPanelLogic(tab: ProductLookupTab, items: ProductLookup[]) {
  const { productLookupsApi } = useApi();
  const invalidate = useInvalidateProductLookupQuery(tab.slug);

  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());
  const [isSavingNew, setIsSavingNew] = useState(false);
  const newInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDrafts((current) => {
      const next = { ...current };
      for (const item of items) {
        if (next[item.id] === undefined) {
          next[item.id] = item.name;
        }
      }
      const validIds = new Set(items.map((item) => item.id));
      for (const id of Object.keys(next)) {
        if (!validIds.has(id)) {
          delete next[id];
        }
      }
      return next;
    });
  }, [items]);

  useEffect(() => {
    if (isAdding) {
      newInputRef.current?.focus();
    }
  }, [isAdding]);

  const setDraft = useCallback((id: string, value: string) => {
    setDrafts((current) => ({ ...current, [id]: value }));
  }, []);

  const startAdding = useCallback(() => {
    setIsAdding(true);
    setNewName("");
  }, []);

  const cancelAdding = useCallback(() => {
    setIsAdding(false);
    setNewName("");
  }, []);

  const saveExisting = useCallback(
    async (item: ProductLookup) => {
      const name = (drafts[item.id] ?? "").trim();
      if (!name) {
        setDraft(item.id, item.name);
        return;
      }
      if (name === item.name) return;

      setSavingIds((current) => new Set(current).add(item.id));
      try {
        await productLookupsApi.update(tab.slug, item.id, { name });
        invalidate();
      } finally {
        setSavingIds((current) => {
          const next = new Set(current);
          next.delete(item.id);
          return next;
        });
      }
    },
    [drafts, invalidate, productLookupsApi, setDraft, tab.slug],
  );

  const saveNew = useCallback(async () => {
    const name = newName.trim();
    if (!name) {
      newInputRef.current?.focus();
      return;
    }

    setIsSavingNew(true);
    try {
      await productLookupsApi.create(tab.slug, { name });
      invalidate();
      cancelAdding();
    } finally {
      setIsSavingNew(false);
    }
  }, [
    cancelAdding,
    invalidate,
    newName,
    productLookupsApi,
    tab.slug,
  ]);

  return {
    drafts,
    setDraft,
    isAdding,
    newName,
    setNewName,
    newInputRef,
    savingIds,
    isSavingNew,
    startAdding,
    cancelAdding,
    saveExisting,
    saveNew,
  };
}
