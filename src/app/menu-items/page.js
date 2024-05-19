'use client'
import { useProfile } from '@/components/UseProfile'
import UserTabs from '@/components/UserTabs';
import Image from 'next/image';
import Link from 'next/link';




export default function MenuItemsPage() {


    const { loading, data } = useProfile();


    if (loading) {
        return 'Loading user info...'
    }
    if (!data.admin) {
        return 'Not an admin'
    }
    return (
        <section className='mt-12 max-w-md mx-auto'>
            <UserTabs isAdmin={true} />
            <div className='mt-8'>
                <Link
                    className='button flex'
                    href={'/menu-items/new'}>
                    Create new menu item
                    <Image src={'/right.png'} width={25} height={10} />
                </Link>
            </div>
        </section>
    )
}