import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/providers/cart";
import { convertPriceFromCentsToUSD } from "@/utils/product";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

export default function Home() {
  const { products, loading, error, retry } = useProducts();
  const { cart, addItemToCart } = useCart();

  if (loading) return 'Loading ...';

  if (error) return 'Some error occurred';

  return (
    <main>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <nav className="flex justify-end">
            <div className="flex relative">
              <Link href="/cart" className="flex">
                Cart
                <FaShoppingCart className="w-5 h-5" />
              </Link>
              {cart.length ? (
                <span className="text-center absolute -top-1 -right-2 bg-blue-500 text-white rounded-full text-xs px-1">
                  {cart.length}
                </span>
              ) : null}
            </div>
          </nav>

          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Product Collection</h2>
            <p className="mt-4 max-w-md text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
              dicta incidunt est ipsam, officia dolor fugit natus?
            </p>
          </header>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products?.map((product, idx) => <li key={product.id + idx}>
              <div>
                <div className="group block overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={292}
                      height={450}
                      className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                    />

                  <div className="relative bg-white pt-3">
                    <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                      {product.name}
                    </h3>

                    <p className="mt-2">
                      <span className="sr-only"> Regular Price </span>

                      <span className="tracking-wider text-gray-900"> ${convertPriceFromCentsToUSD(product.amountCents)} </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 justify-center pt-3">
                  <button
                    aria-label="Check out"
                    className='cursor-pointer bg-black text-gray-100 text-sm px-6 py-3 w-full flex justify-center'
                    onClick={() => addItemToCart({
                      product,
                      quantity: 1,
                    })}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </li>)}
          </ul>
        </div>
      </section>
    </main>
  );
}
