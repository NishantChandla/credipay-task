import { useCart } from '@/providers/cart';
import { convertPriceFromCentsToUSD } from '@/utils/product';
import Link from 'next/link';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputField } from '@/components/InputField';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { SelectField } from '@/components/SelectField';
import { toast } from 'react-toastify';
import { RadioGroup } from '@/components/RadioGroup';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { BiChevronLeft } from 'react-icons/bi';
import { useRouter } from 'next/router';

const schema = z
    .object({
        buyerTaxId: z.string().min(1, { message: 'Tax Id is required' }),
        paymentTerms: z.number({ message: 'Payment term is required' }),
        paymentMethod: z
            .string({ message: 'Payment method is required' }),
        shippingAddress1: z.string().min(1, { message: 'Shipping Address 1 is required' }),
        shippingAddress2: z.string().min(1, { message: 'Shipping Address 2 is required' }),
        shippingCity: z.string().min(1, { message: 'Shipping City is required' }),
        shippingRegion: z.string().min(1, { message: 'Shipping Region is required' }),
        shippingPostalCode: z.string().min(1, { message: 'Shipping Postal Code is required' }),
        shippingCountry: z.string().min(1, { message: 'Shipping Country is required' }),
    });

type ValidationSchemaType = z.infer<typeof schema>;

export default function CheckoutPage() {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationSchemaType>({ resolver: zodResolver(schema) });
    const [loading, setLoading] = useState(false);
    const { cart, cartTotal, deleteItemFromCart, clearCart } = useCart();
    const router = useRouter();

    const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {
        setLoading(true);
        try {
            if (!cart.length) {
                throw new Error('Cart is empty')
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/orders`,
                {
                    method: 'POST',
                    body: JSON.stringify({ ...data, items: cart.map(item => ({ productId: item.product.id, quantity: item.quantity })) }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (res.ok) {
                reset();
                clearCart();
                const order = await res.json();

                if (order && order.status === 'created') {
                    toast.success('Order created');
                    router.push('/order-confirmation');
                }
                return;
            }
            throw new Error('Some Error Occurred');
        } catch (e) {
            console.log(e); //eslint-disable-line no-console
            if (e instanceof Error) toast.error(e.message);
            else toast.error('Error while creating order.');
        }
        setLoading(false);
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="pt-10 pb-8">
                <Link href="/cart" className='flex gap-1 items-center'><BiChevronLeft className='w-6 h-6' /> Back to Cart</Link>
                <br />
                <h1 className="text-5xl font-light">Checkout</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">

                <div className="form-control gap-1">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">Tax information</h2>
                        <InputField
                            type="text"
                            placeholder="Tax Id"
                            label="Tax Id"
                            error={errors.buyerTaxId?.message}
                            register={register('buyerTaxId')}
                        />
                    </div>
                    <div className="mt-10 border-t border-gray-200 pt-10">
                        <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>
                        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <div className="sm:col-span-2">
                                <InputField
                                    type="text"
                                    placeholder="Shipping Address 1"
                                    label="Shipping Address 1"
                                    error={errors.shippingAddress1?.message}
                                    register={register('shippingAddress1')}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <InputField
                                    type="text"
                                    placeholder="Shipping Address 2"
                                    label="Shipping Address 2"
                                    error={errors.shippingAddress2?.message}
                                    register={register('shippingAddress2')}
                                />
                            </div>
                            <InputField
                                type="text"
                                placeholder="Shipping City"
                                label="Shipping City"
                                error={errors.shippingCity?.message}
                                register={register('shippingCity')}
                            />
                            <InputField
                                type="text"
                                placeholder="Shipping Region"
                                label="Shipping Region"
                                error={errors.shippingRegion?.message}
                                register={register('shippingRegion')}
                            />
                            <InputField
                                type="text"
                                placeholder="Shipping Postal Code"
                                label="Shipping Postal Code"
                                error={errors.shippingPostalCode?.message}
                                register={register('shippingPostalCode')}
                            />
                            <InputField
                                type="text"
                                placeholder="Shipping Country"
                                label="Shipping Country"
                                error={errors.shippingCountry?.message}
                                register={register('shippingCountry')}
                            />
                        </div>
                    </div>

                    <div className="mt-10 border-t border-gray-200 pt-10">
                        <h2 className="text-lg font-medium text-gray-900">Payment Method</h2>
                        <RadioGroup
                            options={[{
                                label: "Pay Later With Credipay",
                                description: `Pay $${convertPriceFromCentsToUSD(cartTotal + Math.floor(cartTotal * 0.3) + 1000)} later`,
                                value: 'bnpl'
                            },
                            {
                                label: "Credit Card (Not Available)",
                                description: `Pay $${convertPriceFromCentsToUSD(cartTotal + Math.floor(cartTotal * 0.3) + 1000)} now`,
                                value: 'creditcard',
                                disabled: true
                            }
                            ]}
                            error={errors.paymentMethod?.message}
                            register={register('paymentMethod')}
                        />
                    </div>

                    <div className="mt-10 border-t border-gray-200 pt-10">
                        <SelectField
                            label="Payment Terms"
                            error={errors.paymentTerms?.message}
                            register={register('paymentTerms', { valueAsNumber: true })}
                            options={[{
                                label: '7 days',
                                value: '7'
                            }, {
                                label: '14 days',
                                value: '14'
                            }, {
                                label: '30 days',
                                value: '30'
                            }]}
                        />
                    </div>
                </div>

                <div className="mt-10 lg:mt-0">
                    <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

                    <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                        <ul role="list" className="divide-y divide-gray-200">
                            {cart.map((item) => (
                                <li key={item.product.id} className="flex px-4 py-6 sm:px-6">
                                    <div className="relative w-32 h-32 flex-shrink-0">
                                        <Image
                                            fill
                                            src={item.product.image}
                                            alt="placeholder image"
                                            className="object-cover w-32 h-full border"
                                        />
                                    </div>

                                    <div className="ml-6 flex flex-1 flex-col">
                                        <div className="flex">
                                            <div className="min-w-0 flex-1">
                                                <h4 className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                    {item.product.name}
                                                </h4>
                                            </div>
                                            <div className="ml-4 flow-root flex-shrink-0">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        deleteItemFromCart(item.product);
                                                    }}
                                                    className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                                                >
                                                    <span className="sr-only">Remove</span>
                                                    <FaTimes className="h-5 w-5" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-1 justify-between pt-2">
                                            <p className="mt-1 text-sm font-medium text-gray-900">${convertPriceFromCentsToUSD(item.product.amountCents)}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm">Cart Total</dt>
                                <dd className="text-sm font-medium text-gray-900">${convertPriceFromCentsToUSD(cartTotal)}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-sm">Tax</dt>
                                <dd className="text-sm font-medium text-gray-900">${convertPriceFromCentsToUSD(Math.floor(cartTotal * 0.3))}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-sm">Shipping Cost</dt>
                                <dd className="text-sm font-medium text-gray-900">$10</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                <dt className="text-base font-medium">Total</dt>
                                <dd className="text-base font-medium text-gray-900">${convertPriceFromCentsToUSD(cartTotal + Math.floor(cartTotal * 0.3) + 1000)}</dd>
                            </div>
                        </dl>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex justify-center w-full rounded-md border border-transparent bg-black px-4 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                                {loading ? (
                                    <AiOutlineLoading3Quarters className="w-6 h-6 animate-spin text-primary-content" />
                                ) : (
                                    'Checkout'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}