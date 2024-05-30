'use client'
import AddressInput from "@/components/AddressInput";
import { CartContext, cartProductPrice } from "@/components/AppContext"
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react"
import CartProduct from "@/components/CartProduct";
import Image from "next/image";

export default function OrderPage() {

    const { clearCart } = useContext(CartContext);
    const [order, setOrder] = useState();
    const [loadingOrder, setLoadingOrder] = useState(true)
    const {id} = useParams()

    useEffect(() => {
        if (typeof window.console !== "undefined") {
            if (window.location.href.includes('clear-cart=1')) {
                clearCart()
            }
        }
        if(id){
            setLoadingOrder(true)
            fetch('/api/orders?_id='+id).then(res => {
                res.json().then(orderData => {
                    setOrder(orderData);
                    setLoadingOrder(false)
                })
            })
        }
    },[])

    let subtotal = 0;
    if (order?.cartProducts){
        for (const product of order?.cartProducts){
            subtotal += cartProductPrice(product);
        }
    }
    return (
        <section className="max-w-2xl  mx-auto  mt-12">
            <div className="text-center px-4 md:px-0">
                <h1 className='text-center text-4xl font-semibold text-red-500'>Your Order</h1>
                <div className="my-4">
                    <p >✅ Thanks for your order</p>
                    <p>We will call 📞 you when your order will be on the way 🛣️</p>
                </div>
            </div>
            {loadingOrder && (
                <div className="grid place-items-center h-[400px]">
                <Image className="w-[300px]" src={'/foodLoader.gif'} alt='foodloading' height={100} width={100}/>
            </div>
            )}
            {order && (
                <div className="grid md:grid-cols-2 md:gap-16 mt-8 px-4 md:px-0">
                    <div>
                        {order.cartProducts.map(product => (
                            <CartProduct key={product._id} product={product}/>
                        ))}
                        <div className="text-right py-2 text-gray-500">
                            SubTotal: <span className="text-black font-bold ml-2">${subtotal}</span><br/>
                            Delivery: <span className="text-black font-bold ml-2">$5</span><br/>
                            Total: <span className="text-black font-bold ml-2">${subtotal+5}</span><br/>
                            </div>
                    </div>
                    <div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                             <AddressInput disabled={true} addressProps={order}/>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}