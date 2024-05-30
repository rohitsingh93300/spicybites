'use client'
import {useProfile} from '@/components/UseProfile'
import UserTabs from "@/components/UserTabs"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import MenuItemForm from "@/components/MenuItemForm"
import DeleteButton from "@/components/DeleteButton"
import Left from "@/components/Left"

export default function EditMenuItemPage(){

    const {id} = useParams()
    
   const [menuItem, setMenuItem] = useState(null);
    const [redirectToItems, setRedirectToItems] = useState(false);
    const { loading, data } = useProfile();

    useEffect(()=>{
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
               const item = items.find(i => i._id === id)
              setMenuItem(item);
            })
        })
    },[])

    async function handleFormSubmit(e, data) {
        e.preventDefault();
        data = {...data, _id:id };
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },

            })
            if (response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(savingPromise, {
            loading:'Saving this tasty item',
            success:'Saved',
            error:'Error'
        });

        setRedirectToItems(true)  
    }

    async function handleDeleteClick(){
        const promise = new Promise(async(resolve, reject)=>{

         const res = await fetch('/api/menu-items?_id='+id, {
                method: "DELETE",
    
            })
            if(res.ok)
                resolve();
            else
            reject();
        });

        toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Deleted',
            error: 'Error'
        })
        setRedirectToItems(true)
    }

    if(redirectToItems){
        return redirect('/menu-items');
    }

    if(loading){
        return 'Loading user info...'
    }
    if(!data.admin){
        return 'Not an admin,';
    }
    return(
        <section className="mt-12">
        <UserTabs isAdmin={true} />
        <div className='max-w-2xl md:mx-auto mt-8 mx-4'>
            <Link href={'/menu-items'} className='button '>
                <Left/>
                <span>Show all menu items</span>
            </Link>
        </div>
       <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
       <div className='grid  max-w-2xl mx-auto mt-2'>
       <div className='md:ml-[215px] px-4 md:px-0 '>
        <DeleteButton label="Delete this menu item" onDelete={handleDeleteClick}/>
       </div>
       </div>
    </section>
    )
}