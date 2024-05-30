'use client'
import Trash from "@/components/Trash"
import Plus from "@/components/Plus"
import ChevronDown from "@/components/ChevronDown"
import ChevronUp from "@/components/ChevronUp"
import { useState } from "react"

export default function MenuItemPriceProps({name, addLabel, props, setProps}){

    const [isOpen, setIsOpen] = useState(false)

    function addProp() {
        setProps(oldSizes => {
            return [...oldSizes, { name: '', price: 0 }];
        });
    }

    function editProp(e, index, prop) {
        const newValue = e.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        })
    }

    function removeProp(indexToRemove) {
        setProps(prev => prev.filter((v, index) => index !== indexToRemove))
    }

    return (


        <div className="bg-gray-200 p-2 rounded-md mb-2">
        <button onClick={()=>setIsOpen(!isOpen)} className="inline-flex p-1 gap-1" type="button">
            {isOpen && <ChevronUp/>}
            {!isOpen && <ChevronDown/>}
            <span>{name}</span>
            <span>({props?.length})</span>
        </button>
        <div className={isOpen ? 'block' : 'hidden'}>
        {props?.length > 0 && props.map((size, index) => (
            <div className="flex items-end gap-2">
                <div>
                    <label>Name</label>
                    <input type="text"
                        placeholder='Size name'
                        value={size.name}
                        onChange={e => editProp(e, index, 'name')}
                    />
                </div>
                <div>
                    <label>Extra Price</label>
                    <input type="text"
                        placeholder="Extra Price"
                        value={size.price}
                        onChange={e => editProp(e, index, 'price')}
                    />
                </div>
                <div>
                    <button
                        type="button"
                        onClick={() => removeProp(index)}
                        className="bg-white mb-2 rounded-lg px-2 py-2">
                        <Trash />
                    </button>
                </div>
            </div>
        ))}
        <button
            type="button"
            onClick={addProp}
            className="bg-white items-center button">
            <Plus className="w-4 h-4" />
            <span>{addLabel}</span>
        </button>
        </div>
      
    </div>
    )
}