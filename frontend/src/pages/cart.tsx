import { QuantityPicker } from '@/components/QuantityPicker';
import { useCart } from '@/providers/cart';
import { convertPriceFromCentsToUSD } from '@/utils/product';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';

export default function CartPage() {
  const { cart, cartTotal, addItemToCart, deleteItemFromCart } = useCart();

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div
          className="
          flex flex-col w-full
        "
        >
          <div className="pt-10 pb-8">
            <Link href="/" className='flex gap-1 items-center'><BiChevronLeft className='w-6 h-6' /> Back to Home</Link>
            <br />
            <h1 className="text-5xl font-light">Your Cart</h1>
          </div>

          {cart && cart.length > 0 ? (
            <div className="flex flex-col">
              <div>
                {cart.map((item, i) => {
                  return (
                    <div key={'cart-item-index' + i} className="border-b py-10">
                      <div className="items-center flex gap-2">
                        <div className="max-md:hidden relative w-32 h-32">
                          <Image
                            fill
                            src={item.product.image}
                            alt="placeholder image"
                            className="object-cover w-32 h-full border"
                          />
                        </div>
                        {item.product.name}
                        <div className="ml-4">
                          <QuantityPicker
                            numberOfitems={item.quantity}
                            increment={() => {
                              addItemToCart({
                                product: item.product,
                                quantity: item.quantity + 1,
                              });
                            }}
                            decrement={() => {
                              addItemToCart({
                                product: item.product,
                                quantity: item.quantity > 1 ? item.quantity - 1 : 1,
                              });
                            }}
                          />
                        </div>
                        <div className="flex flex-1 justify-end">
                          <p className="m-0 pl-10 text-gray-900 tracking-wider">
                            ${convertPriceFromCentsToUSD(item.product.amountCents)}
                          </p>
                        </div>
                        <div
                          role="button"
                          onClick={() => {
                            deleteItemFromCart(item.product);
                          }}
                          className="
                  m-0 ml-10 text-gray-900 text-s cursor-pointer
                  "
                        >
                          <FaTimes />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <h3>No items in cart.</h3>
          )}
          <div className="flex flex-1 justify-end items-center py-8">
            <p className="text-sm pr-10">Total</p>
            <p className="font-semibold tracking-wide">${convertPriceFromCentsToUSD(cartTotal)}</p>
          </div>
          {!!cart.length &&
            <div className="flex flex-1 justify-center">
              <Link
                href="/checkout"
                aria-label="Check out"
                className='cursor-pointer bg-black text-gray-100 text-sm px-6 py-3'
              >
                Proceed to checkout
              </Link>
            </div>
          }
        </div>
      </div>
    </>
  )
}