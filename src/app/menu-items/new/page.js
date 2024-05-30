'use client'
import { useProfile } from '@/components/UseProfile'
import UserTabs from "@/components/UserTabs"
import { useState } from "react";
import toast from "react-hot-toast";
import Link from 'next/link';
import { redirect } from 'next/navigation';
import MenuItemForm from '@/components/MenuItemForm';
import Left from "@/components/Left"
import Image from 'next/image';


export default function NewMenuItemPage() {


    const [redirectToItems, setRedirectToItems] = useState(false)
    const { loading, data } = useProfile();

    async function handleFormSubmit(e, data) {
        e.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },

            })
            if (response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(savingPromise, {
            loading: 'Saving this tasty item',
            success: 'Saved',
            error: 'Error'
        });

        setRedirectToItems(true)


    }
    if (redirectToItems) {
        return redirect('/menu-items');
    }

    if (loading) {
        return <div className="grid place-items-center h-[400px]">
            <Image className="w-[300px]" src={'/foodLoader.gif'} alt='foodloading' height={100} width={100} />
        </div>
    }
    if (!data.admin) {
        return 'Not an admin,';
    }
    return (
        <section className="mt-12">
            <UserTabs isAdmin={true} />
            <div className='max-w-2xl mx-4 md:mx-auto mt-8 '>
                <Link href={'/menu-items'} className='button'>
                    <Left />
                    <span>Show all menu items</span>
                </Link>
            </div>
            <MenuItemForm onSubmit={handleFormSubmit} menuItem={null} />
        </section>
    )
}