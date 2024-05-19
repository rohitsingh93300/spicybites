'use client'

import UserTabs from "@/components/UserTabs"
import { useProfile } from '../../components/UseProfile'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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


    if (profileLoading) {
        return 'Loading user info...'
    }

    if (!profileData.admin) {
        return 'Not and admin';
    }

    return (
        <section className='mt-12 max-w-md mx-auto'>
            <UserTabs isAdmin={true} />
            <form className="mt-8" onSubmit={handleCategorySubmit}>
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
                    <div className="pb-2">
                        <button type="submit" className="px-4 py-2 rounded-xl">
                            {editedCategory ? 'Update':'Create'}
                            </button>
                    </div>
                </div>


            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Edit category:</h2>
                {categories?.length > 0 && categories.map((category)=>{
                    return <button 
                    onClick={()=> {
                        setEditedCategory(category);
                        setCategoryName(category.name)
                    }}
                    className="bg-gray-200 cursor-pointer w-full rounded-xl p-2 px-4 flex gap-1 mb-2">
                        <span>{category.name}</span>
                    </button>
                })}
            </div>
        </section>
    )
}

export default CategoriesPage
