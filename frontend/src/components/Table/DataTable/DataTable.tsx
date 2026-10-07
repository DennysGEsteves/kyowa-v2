import { resolveColumnCell } from "../resolve-column-cell";
import { resolveRowKey } from "../resolve-row-key";
import type { DataTableProps, TableColumn } from "../types";
import { TableBody } from "../TableBody";
import { TableCardFields } from "../TableCardFields";
import { TableCardFooter } from "../TableCardFooter";
import { TableCardHeader } from "../TableCardHeader";
import { TableCell } from "../TableCell";
import { TableElement } from "../TableElement";
import { TableEmpty } from "../TableEmpty";
import { TableHead } from "../TableHead";
import { TableHeader } from "../TableHeader";
import { TableMobileCard } from "../TableMobileCard";
import { TableMobileList } from "../TableMobileList";
import { TableRoot } from "../TableRoot";
import { TableRow } from "../TableRow";

function getMobileColumns<T>(columns: TableColumn<T>[]) {
  return columns.filter((column) => column.mobile);
}

export function DataTable<T>({
  data,
  columns,
  emptyMessage = "Nenhum registro encontrado.",
  onRowClick,
}: DataTableProps<T>) {
  const interactiveRowClass = onRowClick
    ? "cursor-pointer focus-within:ring-1 focus-within:ring-kyowa-maroon/30"
    : "";
  if (data.length === 0) {
    return <TableEmpty>{emptyMessage}</TableEmpty>;
  }

  const mobileColumns = getMobileColumns(columns);

  return (
    <>
      <TableMobileList>
        {data.map((row, index) => {
          const titleColumn = mobileColumns.find(
            (column) => column.mobile?.role === "title",
          );
          const subtitleColumn = mobileColumns.find(
            (column) => column.mobile?.role === "subtitle",
          );
          const trailingColumn = mobileColumns.find(
            (column) => column.mobile?.role === "trailing",
          );
          const fieldColumns = mobileColumns.filter(
            (column) => column.mobile?.role === "field",
          );
          const actionsColumn = mobileColumns.find(
            (column) => column.mobile?.role === "actions",
          );

          return (
            <TableMobileCard
              key={resolveRowKey(row, index)}
              className={interactiveRowClass}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {(titleColumn || subtitleColumn || trailingColumn) && (
                <TableCardHeader
                  title={
                    titleColumn ? resolveColumnCell(row, titleColumn) : null
                  }
                  subtitle={
                    subtitleColumn
                      ? resolveColumnCell(row, subtitleColumn)
                      : undefined
                  }
                  trailing={
                    trailingColumn
                      ? resolveColumnCell(row, trailingColumn)
                      : undefined
                  }
                />
              )}

              {fieldColumns.length > 0 ? (
                <TableCardFields
                  fields={fieldColumns.map((column) => ({
                    label: column.mobile?.label ?? String(column.header),
                    value: resolveColumnCell(row, column),
                    className: column.mobile?.className,
                  }))}
                />
              ) : null}

              {actionsColumn ? (
                <TableCardFooter>
                  {resolveColumnCell(row, actionsColumn)}
                </TableCardFooter>
              ) : null}
            </TableMobileCard>
          );
        })}
      </TableMobileList>

      <TableRoot>
        <TableElement>
          <TableHeader>
            <tr>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  align={column.align}
                  className={column.className}
                >
                  {column.header}
                </TableHead>
              ))}
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={resolveRowKey(row, index)}
                className={interactiveRowClass}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className={column.className}
                  >
                    {resolveColumnCell(row, column)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </TableElement>
      </TableRoot>
    </>
  );
}
