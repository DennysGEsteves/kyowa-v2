"use client";

import { useProductLookupQuery } from "@/api/ProductLookups/product-lookups.query";
import type { ProductLookupTab } from "@/api/ProductLookups";
import { ActionButton } from "@/components/Form/ActionButton";
import { getFieldClassName } from "@/components/Form";
import {
  TableBody,
  TableCell,
  TableElement,
  TableEmpty,
  TableHead,
  TableHeader,
  TableMobileCard,
  TableMobileList,
  TableRoot,
  TableRow,
} from "@/components/Table";
import type { ProductLookup } from "@entities";
import { Plus, Trash } from "lucide-react";
import { useState, type KeyboardEvent, type RefObject } from "react";
import { DeleteLookupDialog } from "./DeleteLookupDialog";
import { useLookupTabPanelLogic } from "./LookupTabPanel.logic";

type LookupTabPanelProps = {
  tab: ProductLookupTab;
};

const nameInputClass = `${getFieldClassName(false)} w-full min-w-0`;

function LookupNameInput({
  value,
  onChange,
  onBlur,
  onKeyDown,
  inputRef,
  disabled,
  placeholder = "Nome",
  "aria-label": ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
  disabled?: boolean;
  placeholder?: string;
  "aria-label"?: string;
}) {
  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      aria-label={ariaLabel}
      className={nameInputClass}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
}

function LookupNewRowActions({
  onSave,
  onCancel,
  isSaving,
}: {
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
}) {
  return (
    <div className="flex shrink-0 items-center justify-end gap-1">
      <button
        type="button"
        onClick={onCancel}
        disabled={isSaving}
        className="px-2 py-2 text-sm font-medium text-kyowa-muted hover:text-kyowa-ink disabled:opacity-60"
      >
        Cancelar
      </button>
      <ActionButton
        type="button"
        variant="primary"
        className="px-3 py-2 text-xs"
        disabled={isSaving}
        onMouseDown={(event) => event.preventDefault()}
        onClick={onSave}
      >
        Salvar
      </ActionButton>
    </div>
  );
}

function newRowKeyDownHandlers(
  onSave: () => void,
  onCancel: () => void,
): (event: KeyboardEvent<HTMLInputElement>) => void {
  return (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onCancel();
    }
    if (event.key === "Enter") {
      event.preventDefault();
      onSave();
    }
  };
}

export function LookupTabPanel({ tab }: LookupTabPanelProps) {
  const [deleteItem, setDeleteItem] = useState<ProductLookup | null>(null);
  const { data: items = [], isLoading } = useProductLookupQuery(tab.slug);

  const {
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
  } = useLookupTabPanelLogic(tab, items);

  const newLabel =
    tab.slug === "categories" ? "Nova categoria" : `Nova ${tab.singular}`;

  const showEmpty = !isLoading && items.length === 0 && !isAdding;

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-kyowa-muted">
          {items.length}{" "}
          {items.length === 1 ? "registro" : "registros"} em{" "}
          {tab.label.toLowerCase()}
        </p>
        <button
          type="button"
          onClick={startAdding}
          disabled={isAdding}
          className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          {newLabel}
        </button>
      </div>

      {showEmpty ? (
        <TableEmpty>
          Nenhum registro em {tab.label.toLowerCase()}. Use &quot;{newLabel}
          &quot; para adicionar.
        </TableEmpty>
      ) : (
        <>
          <TableMobileList>
            {items.map((item) => (
              <TableMobileCard key={item.id}>
                <div className="flex items-start gap-2">
                  <LookupNameInput
                    value={drafts[item.id] ?? item.name}
                    onChange={(value) => setDraft(item.id, value)}
                    onBlur={() => saveExisting(item)}
                    disabled={savingIds.has(item.id)}
                    aria-label={`Nome de ${item.name}`}
                  />
                  <ActionButton
                    variant="ghost"
                    className="shrink-0 p-2"
                    onClick={() => setDeleteItem(item)}
                    aria-label={`Remover ${item.name}`}
                  >
                    <Trash className="h-4 w-4 text-red-700" strokeWidth={1.75} />
                  </ActionButton>
                </div>
              </TableMobileCard>
            ))}
            {isAdding ? (
              <TableMobileCard>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <LookupNameInput
                    inputRef={newInputRef}
                    value={newName}
                    onChange={setNewName}
                    disabled={isSavingNew}
                    placeholder={`Nome da ${tab.singular}`}
                    onKeyDown={newRowKeyDownHandlers(saveNew, cancelAdding)}
                  />
                  <LookupNewRowActions
                    onSave={saveNew}
                    onCancel={cancelAdding}
                    isSaving={isSavingNew}
                  />
                </div>
              </TableMobileCard>
            ) : null}
          </TableMobileList>

          <TableRoot>
            <TableElement>
              <TableHeader>
                <tr>
                  <TableHead>Nome</TableHead>
                  <TableHead align="right" className="w-44">
                    Ações
                  </TableHead>
                </tr>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <LookupNameInput
                        value={drafts[item.id] ?? item.name}
                        onChange={(value) => setDraft(item.id, value)}
                        onBlur={() => saveExisting(item)}
                        disabled={savingIds.has(item.id)}
                        aria-label={`Nome de ${item.name}`}
                        onKeyDown={(event) => {
                          if (event.key === "Escape") {
                            setDraft(item.id, item.name);
                            event.currentTarget.blur();
                          }
                          if (event.key === "Enter") {
                            event.preventDefault();
                            event.currentTarget.blur();
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <ActionButton
                        variant="ghost"
                        className="p-2"
                        onClick={() => setDeleteItem(item)}
                        aria-label={`Remover ${item.name}`}
                      >
                        <Trash
                          className="h-4 w-4 text-red-700"
                          strokeWidth={1.75}
                        />
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
                {isAdding ? (
                  <TableRow>
                    <TableCell>
                      <LookupNameInput
                        inputRef={newInputRef}
                        value={newName}
                        onChange={setNewName}
                        disabled={isSavingNew}
                        placeholder={`Nome da ${tab.singular}`}
                        onKeyDown={newRowKeyDownHandlers(saveNew, cancelAdding)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <LookupNewRowActions
                        onSave={saveNew}
                        onCancel={cancelAdding}
                        isSaving={isSavingNew}
                      />
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </TableElement>
          </TableRoot>
        </>
      )}

      {isAdding && showEmpty ? (
        <div className="mt-4 flex max-w-md flex-col gap-3 sm:flex-row sm:items-start">
          <LookupNameInput
            inputRef={newInputRef}
            value={newName}
            onChange={setNewName}
            disabled={isSavingNew}
            placeholder={`Nome da ${tab.singular}`}
            onKeyDown={newRowKeyDownHandlers(saveNew, cancelAdding)}
          />
          <LookupNewRowActions
            onSave={saveNew}
            onCancel={cancelAdding}
            isSaving={isSavingNew}
          />
        </div>
      ) : null}

      <DeleteLookupDialog
        open={Boolean(deleteItem)}
        tab={tab}
        item={deleteItem}
        onClose={() => setDeleteItem(null)}
      />
    </>
  );
}
