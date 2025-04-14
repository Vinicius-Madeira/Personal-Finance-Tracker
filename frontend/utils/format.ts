import { parseISO } from "date-fns";

export const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const currencyNoCents = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export function parseLocalDate(dateString: string | Date) {
  return parseISO(`${dateString}T12:00:00`);
}
