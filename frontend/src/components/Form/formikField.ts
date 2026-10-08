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
  submitCount = 0,
): string | undefined {
  const isTouched = Boolean(getIn(touched, name));
  if (!isTouched && submitCount <= 0) {
    return undefined;
  }
  const error = getIn(errors, name);
  return error ? String(error) : undefined;
}
