import { SaleEntity } from '../../entities/sale';
import { SaleType } from '../../entities/sale/types/sale-type';

function dateValue(value: Date | null): string | null {
  return value ? value.toISOString() : null;
}

export function buildSaleUpdateHistoryData(
  previous: SaleEntity,
  next: SaleEntity,
): Record<string, unknown> {
  const data: Record<string, unknown> = {};

  if (previous.clientId !== next.clientId) {
    data.previousClientId = previous.clientId;
    data.clientId = next.clientId;
  }
  if (previous.sellerId !== next.sellerId) {
    data.previousSellerId = previous.sellerId;
    data.sellerId = next.sellerId;
  }
  if (previous.storeId !== next.storeId) {
    data.previousStoreId = previous.storeId;
    data.storeId = next.storeId;
  }
  if (previous.architectId !== next.architectId) {
    data.previousArchitectId = previous.architectId;
    data.architectId = next.architectId;
  }
  if (previous.architectParticipation !== next.architectParticipation) {
    data.previousArchitectParticipation = previous.architectParticipation;
    data.architectParticipation = next.architectParticipation;
  }
  if (previous.obsReceipt !== next.obsReceipt) {
    data.previousObsReceipt = previous.obsReceipt;
    data.obsReceipt = next.obsReceipt;
  }
  if (previous.obsInternal !== next.obsInternal) {
    data.previousObsInternal = previous.obsInternal;
    data.obsInternal = next.obsInternal;
  }
  if (previous.type !== next.type) {
    data.previousType = previous.type;
    data.type = next.type;
  }
  if (dateValue(previous.paidAt) !== dateValue(next.paidAt)) {
    data.previousPaidAt = dateValue(previous.paidAt);
    data.paidAt = dateValue(next.paidAt);
  }
  if (previous.paymentMethod !== next.paymentMethod) {
    data.previousPaymentMethod = previous.paymentMethod;
    data.paymentMethod = next.paymentMethod;
  }
  if (previous.plots !== next.plots) {
    data.previousPlots = previous.plots;
    data.plots = next.plots;
  }
  if (previous.changeCredit !== next.changeCredit) {
    data.previousChangeCredit = previous.changeCredit;
    data.changeCredit = next.changeCredit;
  }
  if (JSON.stringify(previous.checkout) !== JSON.stringify(next.checkout)) {
    data.previousCheckout = previous.checkout;
    data.checkout = next.checkout;
  }

  if (data.type === SaleType.Sale && previous.type === SaleType.Consignment) {
    data.event = 'closed_as_sale';
  }

  return data;
}