import { CartProvider } from "@/providers/cart";
import type { AppProps } from "next/app";
import { Inter } from 'next/font/google';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "@/styles/globals.css";

const inter = Inter({
	weight: ['300', '400', '600'],
	subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
	return <>
		<main className={inter.className}>
			<CartProvider>
				<Component {...pageProps} />
			</CartProvider>
		</main>
		<ToastContainer
			position="bottom-center"
			theme="colored"
			transition={Slide}
		/>
	</>;
}
