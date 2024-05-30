'use client'
import { useProfile } from '@/components/UseProfile'
import UserTabs from '@/components/UserTabs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';




export default function MenuItemsPage() {

    const [menuItems, setMenuItems] = useState()
    const { loading, data } = useProfile();

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems)
            })
        })
    }, [])


    if (loading) {
        return <div className="grid place-items-center h-[400px]">
            <Image className="w-[300px]" src={'/foodLoader.gif'} alt='foodloading' height={100} width={100} />
        </div>
    }
    if (!data.admin) {
        return 'Not an admin'
    }
    return (
        <section className='mt-12 max-w-2xl mx-auto'>
            <UserTabs isAdmin={true} />
            <div className='mt-8 mx-4 md:mx-0 '>
                <Link
                    className='button flex'
                    href={'/menu-items/new'}>
                    Create new menu item
                    <Image src={'/right.png'} width={25} height={10} alt='right' />
                </Link>
            </div>
            <div className='px-4 md:px-0'>
                <h2 className='text-sm text-gray-500 mt-8'>Edit menu item:</h2>
                <div className='grid grid-cols-3 gap-2'>
                    {menuItems?.length > 0 && menuItems.map(item => (
                        <Link
                            key={item._id}
                            href={'/menu-items/edit/' + item._id} className='bg-gray-200  rounded-lg p-4 '>
                            <div className='relative'>
                                <Image className='rounded-md' src={item.image} alt='menu-item' width={200} height={200} />
                            </div>
                            <div className='text-center'>
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    )
}