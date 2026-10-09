export enum BudgetClosingAt {
  Until3Days = 'until3days',
  From4To7 = 'from4to7',
  From8To10 = 'from8to10',
  From11To15 = 'from11to15',
  From16To30 = 'from16to30',
  None = 'none',
}

export const BUDGET_CLOSING_AT_VALUES = Object.values(BudgetClosingAt);
