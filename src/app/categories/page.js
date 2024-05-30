'use client'

import UserTabs from "@/components/UserTabs"
import { useProfile } from '../../components/UseProfile'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteButton from "@/components/DeleteButton"
import Image from "next/image";

function CategoriesPage() {

    const [categoryName, setCategoryName] = useState();
    const [categories, setCategories] = useState();
    const [editedCategory, setEditedCategory] = useState(null)
    const { loading: profileLoading, data: profileData } = useProfile();

    useEffect(()=> {
     fetchCategories()
    },[]);

     function fetchCategories(){
        fetch('/api/categories').then(res => {
        res.json().then(categories => {
            setCategories(categories);
        });
    });
}


    async function handleCategorySubmit(e) {
        e.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = {name:categoryName}
            if (editedCategory){
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT':'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }

            });
            setCategoryName('');
            fetchCategories();
            setEditedCategory(null)
            if (response.ok)
                resolve()
            else
                reject()
        })
        await toast.promise(creationPromise, {
            loading: editedCategory ? 'Updating category...': 'Creating your new category...',
            success: editedCategory ? 'Category updated':'Category created',
            error: 'Error, sorry...',
        });
    }

    async function handleDeleteClick(_id){
        const promise = new Promise(async(resolve, reject)=> {

           const res =  await fetch('/api/categories?_id='+_id, {
               method:'DELETE',
   
             })
             if(res.ok){
                resolve();
             }else{
                reject();
             }
        })
        await toast.promise(promise, {
            loading:'Deleting...',
            success: "Deleted",
            error: 'Error'
        })
        fetchCategories()
    }


    if (profileLoading) {
        return <div className="grid place-items-center h-[400px]">
        <Image className="w-[300px]" src={'/foodLoader.gif'} alt='foodloading' height={100} width={100}/>
    </div>
    }

    if (!profileData.admin) {
        return 'Not and admin';
    }

    return (
        <section className='mt-12 max-w-2xl mx-auto'>
            <UserTabs isAdmin={true} />
            <form className="mt-8 px-4 md:px-0" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'Update category':'New category name'}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b></>
                            )}
                            </label>
                        <input
                            onChange={(e) => setCategoryName(e.target.value)}
                            value={categoryName}
                            type="text"
                        />
                    </div>
                    <div className="pb-2 flex gap-2">
                        <button type="submit" className="button ">
                            {editedCategory ? 'Update':'Create'}
                            </button>
                            <button 
                            onClick={()=>{setCategoryName('');
                            setEditedCategory(null)}}
                            type="button" 
                            className="button">Cancel</button>
                    </div>
                </div>


            </form>
            <div className="px-4 md:px-0">
                <h2 className="mt-8 text-sm text-gray-500">Existing category:</h2>
                {categories?.length > 0 && categories.map((category)=>{
                    return <div 
                    key={category._id}
                    className="bg-gray-100 w-full rounded-xl p-2 px-4 items-center flex gap-1 mb-1">
                        <div className="grow">{category.name}</div>
                        <div className="flex gap-1">
                            <button 
                             onClick={()=> {
                                setEditedCategory(category);
                                setCategoryName(category.name)
                            }}
                            className="button" type="button">Edit</button>
                           <DeleteButton label="Delete" onDelete={()=>handleDeleteClick(category._id)}/>
                        </div>
                    </div>
                })}
            </div>
        </section>
    )
}

export default CategoriesPage
