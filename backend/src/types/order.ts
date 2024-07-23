export const paymentMethod = {
  bnpl: 'bnpl',
  creditcard: 'creditcard',
} as const;

export type PaymentMethod = keyof typeof paymentMethod;

export type OrderItem = {
  id: number;
  quantity: number;
  amountCents: number;
  product: {
    id: number;
    name: string;
    image: string;
    amountCents: number;
  };
};

export type Order = {
  id: number;
  externalId?: string | undefined | null;
  subtotalAmountCents: number;
  taxAmountCents: number;
  shippingCostCents: number;
  buyerTaxId: string;
  paymentTerms: number;
  paymentMethod: PaymentMethod;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingCity: string;
  shippingRegion: string;
  shippingPostalCode: string;
  shippingCountry: string;
  items: OrderItem[];
};

export type CredipayOrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  unitPriceCents: number;
};

export type CredipayInstallment = {
  maturityDate: Date;
  faceValueCents: number;
};

export type CredipayOrder = {
  subtotalAmountCents: number;
  taxAmountCents: number;
  shippingCostCents: number;
  externalId: string;
  shippingLocation: {
    address1: string;
    address2: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  estimatedDeliveryDateUTC: Date;
  installments: CredipayInstallment[];
  sellerTaxId: string;
  buyerTaxId: string;
  items: CredipayOrderItem[];
};

export type CredipayOrderResponse = {
  id: string;
  externalId: string;
  subtotalAmountCents: number;
  taxAmountCents: number;
  shippingCostCents: number;
  buyerFeesCents: number;
  totalAmountCents: number;
  shippingLocation: {
    address1: string;
    address2: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  paymentTermDays: number;
  status: string;
  estimatedDeliveryDate: string;
  createdAt: string;
  sellerTaxId: string;
  buyerTaxId: string;
  installments: CredipayInstallment[];
};
