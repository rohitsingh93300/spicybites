'use client'
import MenuCard from "@/components/MenuCard";
import { useEffect } from "react"
import { useState } from "react"

export default function MenuPage() {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(category =>
                setCategories(category)
            )
        })
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItem => setMenuItems(menuItem))
        })
    }, [])
    return (
        <section className="mt-12 lg:max-w-3xl max-w-screen px-7 md:px-0 text-center mx-auto">
            {categories?.length > 0 && categories.map(c => (
                <div key={c._id}>
                    <div className="text-center">
                        <h1 className='text-center text-4xl text-red-500 font-semibold '>{c.name}</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mb-8">
                        {menuItems.filter(item => item.category === c._id).map(item => (
                            <MenuCard key={item._id} {...item} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    )
}