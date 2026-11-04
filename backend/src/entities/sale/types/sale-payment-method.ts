export enum SalePaymentMethod {
  Money = 'money',
  Debit = 'debit',
  Credit = 'credit',
  Financing = 'financing',
  Check = 'check',
  Exchange = 'exchange',
  FinancingStore = 'financing_store',
  Courtesy = 'courtesy',
  BankTransfer = 'bank_transfer',
}

export const SALE_PAYMENT_METHODS = Object.values(SalePaymentMethod);
