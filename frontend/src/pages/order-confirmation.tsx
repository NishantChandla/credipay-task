import Link from 'next/link';
import React from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

export default function OrderConfirmationPage() {
    return (
        <>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="pt-10 pb-8">
                    <Link href="/" className='flex gap-1 items-center'><BiChevronLeft className='w-6 h-6' /> Back to Home</Link>
                </div>

                <div className="flex flex-col h-96 justify-center items-center gap-5">
                    <h1 className="text-3xl flex gap-2 items-center">
                        <IoCheckmarkCircleOutline className='w-8 h-8 text-green-600' /> Order Sent Successfully
                    </h1>
                    <p>
                        You will receive an order confirmation and further payment details in your email and WhatsApp
                    </p>
                    <div className="flex gap-5 justify-center">
                        <Link href='/' className='cursor-pointer bg-black text-gray-100 text-sm px-6 py-3'>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}