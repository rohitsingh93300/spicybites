import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { CartContext } from './AppContext'
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function MenuCard(menuItem) {
    const { image, name, description, basePrice, sizes, extraIngredientPrices } = menuItem;
    const [showPopup, setShowPopup] = useState(false)
    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [selectedExtras, setSelectedExtras] = useState([])
    const { addToCart } = useContext(CartContext)
    const session = useSession()
    const status = session?.status
    const router = useRouter()
    console.log('rohit', session)


    function handleAddToCartButtonClick() {

        const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;

        if (hasOptions && !showPopup) {
            setShowPopup(true)
            return;
        }
        if (status === 'unauthenticated') {
            router.push('/login')
            setShowPopup(false);
            toast('Login to add to cart!😅')
        }
        if (status === 'authenticated') {
            addToCart(menuItem, selectedSize, selectedExtras);
            setShowPopup(false);
            toast.success('Added to cart!')

        }

    }
    function handleExtraThingClick(e, extraThing) {
        const checked = e.target.checked;
        if (checked) {
            setSelectedExtras(prev => [...prev, extraThing])
        } else {
            setSelectedExtras(prev => {
                return prev.filter(e => e.name !== extraThing.name);
            })
        }
    }

    let selectedPrice = basePrice;
    if (selectedSize) {
        selectedPrice += selectedSize.price;
    }
    if (selectedExtras?.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra.price;
        }
    }
    return (
        <>
            {showPopup && (
                <div
                    onClick={() => setShowPopup(false)}
                    className='fixed inset-0 bg-black/80 flex items-center justify-center z-10'>
                    <div
                        onClick={e => e.stopPropagation()}
                        className='my-8 mt-28 bg-white p-2 rounded-lg max-w-md'>
                        <div className='overflow-y-scroll p-2' style={{ maxHeight: 'calc(100vh - 100px)' }}>
                            <Image src={image} alt={name} width={300} height={200} className='mx-auto' />
                            <h2 className='text-lg font-bold text-center mb-2'>{name}</h2>
                            <p className='text-center text-gray-500 text-sm'>{description}</p>
                            {sizes?.length > 0 && (
                                <div className=' p-2'>
                                    <h3 className='text-gray-700'>Pick your size</h3>
                                    {sizes.map(size => (
                                        <label key={size._id} className='flex items-center gap-2 p-4 rounded-md mb-1 border'>
                                            <input
                                                onChange={() => setSelectedSize(size)}
                                                checked={selectedSize?.name === size.name}
                                                type='radio'
                                                name='size' />
                                            {size.name} ${basePrice + size.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            {extraIngredientPrices?.length > 0 && (
                                <div className=' p-2'>
                                    <h3 className='text-gray-700'>Any extras?</h3>
                                    {extraIngredientPrices.map(extraThing => (
                                        <label key={extraThing._id} className='flex items-center gap-2 p-4 rounded-md mb-1 border'>
                                            <input
                                                onChange={e => handleExtraThingClick(e, extraThing)}
                                                checked={selectedExtras.map(e => e._id).includes(extraThing._id)}
                                                type='checkbox'
                                                name={extraThing.name} /> {extraThing.name} ${extraThing.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            <button onClick={handleAddToCartButtonClick} className='primary sticky bottom-2 button' type='button'>Add to cart ${selectedPrice}</button>
                            <button className='mt-2 button' onClick={() => setShowPopup(false)}>Cancel</button>
                        </div>

                    </div>
                </div>
            )}
            <div className='border rounded-lg transition-all duration-500 hover:shadow-lg hover:bg-red-50/85 px-8'>
                <div className='flex items-center justify-center '>
                    <Image src={image} width={150} height={200} />

                </div>
                <div className=''>
                    <h2 className='font-bold '>{name}</h2>
                    <p className='text-xs text-gray-500 line-clamp-3'>{description}</p>
                    <div className='flex justify-center px-4'>

                        <div className='flex items-center justify-center mt-1'>
                            <Image src={'/star.png'} width={15} height={10} />
                            <Image src={'/star.png'} width={15} height={10} />
                            <Image src={'/star.png'} width={15} height={10} />
                            <Image src={'/star.png'} width={15} height={10} />
                            <Image src={'/star-outline.png'} width={15} height={10} />
                        </div>

                    </div>
                    <button
                        type='button'
                        onClick={handleAddToCartButtonClick}
                        className='bg-red-500 mt-3 mb-4 text-white px-4 py-2 rounded-full text-xs'>
                        {(sizes?.length > 0 || extraIngredientPrices?.length > 0) ? (
                            <span>Add to cart (from ${basePrice})</span>
                        ) : (
                            <span>Add to cart ${basePrice}</span>
                        )}
                    </button>
                </div>
            </div>
        </>
    )
}

export default MenuCard
