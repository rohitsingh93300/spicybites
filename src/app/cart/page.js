'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import Trash from '@/components/Trash'
import AddressInput from "@/components/AddressInput"
import { useProfile } from "@/components/UseProfile"
import toast from "react-hot-toast"
import Link from "next/link"
import CartProduct from "@/components/CartProduct"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function CartPage() {
    const { cartProducts, removeCartProduct } = useContext(CartContext)
    const session = useSession()
    const status = session?.status
    const router = useRouter()
    const [address, setAddress] = useState({})
    const { data: profileData } = useProfile()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('canceled=1')) {
                toast.error('Payment failed 😔')
            }
        }
    }, [])

    useEffect(() => {
        if (profileData?.city) {
            const { phone, streetAddress, city, postalCode, country } = profileData;
            const addressFromProfile = { phone, streetAddress, city, postalCode, country }
            setAddress(addressFromProfile)
        }
    }, [profileData]);

    let subtotal = 0;
    for (const p of cartProducts) {
        subtotal += cartProductPrice(p);
    }
    function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({ ...prevAddress, [propName]: value }))
    }

    async function proceedToCheckout(e) {
        e.preventDefault();
        //address and shopping cart products
        const promise = new Promise((resolve, reject) => {

            fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address, cartProducts })
            }).then(async (response) => {
                if (response.ok) {
                    resolve()
                    window.location = await response.json()
                } else {
                    reject();
                }
            })
        })
        await toast.promise(promise, {
            loading: 'Prepearing your order...',
            success: 'Redirecting to payment...',
            error: 'Something went wrong... Please try again later',
        })


    }

    if (cartProducts?.length === 0) {
        return (
            <section className="mt-12 text-center max-w-2xl mx-auto">
                <h1 className='text-center text-4xl font-semibold '>Cart</h1>
                <p className="my-4">Your Shopping cart is empty 😔</p>
                <Link href={'/menu-items'} className=" bg-red-500 px-3 py-2 rounded-full text-white">Order Now</Link>
            </section>
        )
    }
    if(status === 'unauthenticated'){
       return <div className="grid place-items-center h-[80vh]">
         <div className="space-y-8">
         <h1 className="text-3xl font-semibold">
            Login to Add to Cart😅
         </h1>
         <Link href={'/login'} className=" button">Login</Link>
         </div>
       </div>
    }
    return (
        <section className="mt-12">
            <h1 className='text-center text-4xl font-semibold '>Checkout</h1>

            <div className="grid md:gap-8 md:grid-cols-2 mt-8 mx-auto max-w-4xl px-4 md:px-0">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No products in your Shopping Cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                       <CartProduct 
                       key={index}
                       product={product} 
                       onRemove={()=>removeCartProduct(index)}/>
                    ))}
                    <div className="py-4 justify-end pr-16 flex items-center">
                        <div className="text-gray-500">
                            SubTotal:<br />
                            Delivery:<br />
                            Total:
                        </div>

                        <div className=" font-semibold pl-2 text-right">
                            ${subtotal}<br />
                            $5<br />
                            ${subtotal + 5}
                        </div>

                    </div>
                </div>
                <div className="bg-gray-100 max-h-[400px] p-4 rounded-lg">
                    <h2>Checkout</h2>
                    <form onSubmit={proceedToCheckout}>

                        <AddressInput addressProps={address} setAddressProp={handleAddressChange} />
                        <button className="button" type="submit">Pay ${subtotal + 5}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}