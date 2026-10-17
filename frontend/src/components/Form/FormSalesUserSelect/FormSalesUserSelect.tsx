"use client";

import { useUsersQuery } from "@/api/Users/users.query";
import { formInputClass } from "../FieldStyles";
import { FormField } from "../FormField";
import { useMemo } from "react";

type FormSalesUserSelectProps = {
  id: string;
  label?: string;
  value: string;
  onChange: (userId: string) => void;
  className?: string;
  emptyOptionLabel?: string;
  disabled?: boolean;
};

export function FormSalesUserSelect({
  id,
  label = "Vendedor",
  value,
  onChange,
  className,
  emptyOptionLabel = "Todos",
  disabled = false,
}: FormSalesUserSelectProps) {
  const { data: users = [], isLoading } = useUsersQuery();

  const salesUsers = useMemo(
    () =>
      users
        .filter(
          (user) => user.permission === "sales" && user.active !== false,
        )
        .sort((a, b) => a.name.localeCompare(b.name, "pt-BR")),
    [users],
  );

  const isDisabled = disabled || isLoading;

  return (
    <FormField label={label} htmlFor={id} className={className}>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={formInputClass}
        disabled={isDisabled}
      >
        <option value="">
          {isLoading ? "Carregando…" : emptyOptionLabel}
        </option>
        {salesUsers.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </FormField>
  );
}
