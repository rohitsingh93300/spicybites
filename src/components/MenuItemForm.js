'use client'
import EditableImage from "@/components/EditableImage";
import { useEffect, useState } from "react";
import MenuItemPriceProps from "@/components/MenuItemPriceProps"


export default function MenuItemForm({ onSubmit, menuItem }) {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || [])
    const [category, setCategory] = useState(menuItem?.category || '');
    const [categories, setCategories] = useState([])
    useEffect(()=>{
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
               setCategories(categories);
            });
        });
    },[]);

    return (
        <form className="mt-8 max-w-2xl mx-auto" onSubmit={e => onSubmit(e, { image, name, description, basePrice, sizes, extraIngredientPrices, category })}>
            <div className="md:grid items-start gap-4 px-4 md:px-0" style={{ gridTemplateColumns: '.3fr .7fr' }}>
                <div className="">
                    <EditableImage link={image} setLink={setImage} />
                </div>
                <div className="grow">
                    <label>Item name</label>
                    <input
                        value={name}
                        type="text"
                        onChange={(e) => setName(e.target.value)} />
                    <label>Description</label>

                    <input
                        value={description}
                        type="text"
                        onChange={(e) => setDescription(e.target.value)} />
                    <label>Category</label>
                   <select value={category} onChange={e => setCategory(e.target.value)}>
                    {categories?.length > 0 && categories.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                   </select>
                    <label>Base price</label>
                    <input
                        value={basePrice}
                        type="text"
                        onChange={(e) => setBasePrice(e.target.value)} />
                    <MenuItemPriceProps name={'Sizes'} addLabel={'Add item size'} props={sizes} setProps={setSizes} />
                    <MenuItemPriceProps name={'Extra ingredients'} addLabel={'Add ingredients prices'} props={extraIngredientPrices} setProps={setExtraIngredientPrices} />
                    <button className="button" type="submit">Save</button>
                </div>
            </div>
        </form>
    )
}