import { CredipayOrder, Order, OrderItem } from 'src/types/order';

export const calculateAmountSubTotal = (items: Partial<OrderItem>[]) => {
  return items.reduce(
    (amount, item) => amount + item.quantity * item.product.amountCents,
    0,
  );
};

export const calculateTax = (subtotal: number) => {
  return subtotal * 0.3;
};

export const calculateShippingCost = () => 1000;

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export const mapOrderToCredipayBody = (
  order: Order,
  sellerTaxId: string,
): CredipayOrder => {
  return {
    subtotalAmountCents: order.subtotalAmountCents,
    taxAmountCents: order.taxAmountCents,
    shippingCostCents: order.shippingCostCents,
    externalId: order.id.toString(),
    shippingLocation: {
      address1: order.shippingAddress1,
      address2: order.shippingAddress2,
      city: order.shippingCity,
      region: order.shippingRegion,
      postalCode: order.shippingPostalCode,
      country: order.shippingCountry,
    },
    estimatedDeliveryDateUTC: addDays(new Date(), 15),
    installments: [
      {
        maturityDate: addDays(new Date(), order.paymentTerms),
        faceValueCents:
          order.subtotalAmountCents +
          order.taxAmountCents +
          order.shippingCostCents,
      },
    ],
    sellerTaxId,
    buyerTaxId: order.buyerTaxId,
    items: order.items.map((item) => ({
      productId: item.product.id.toString(),
      productName: item.product.name,
      quantity: item.quantity,
      unitPriceCents: item.amountCents,
    })),
  };
};
