import { getIn } from "formik";

export function getFormikFieldValue(
  values: unknown,
  name: string,
): unknown {
  return getIn(values, name);
}

export function getFormikFieldError(
  touched: unknown,
  errors: unknown,
  name: string,
): string | undefined {
  if (!getIn(touched, name)) {
    return undefined;
  }
  const error = getIn(errors, name);
  return error ? String(error) : undefined;
}
