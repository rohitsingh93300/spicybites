'use client'
import EditableImage from "@/components/EditableImage"
import { useState } from "react";
import { useProfile } from "./UseProfile";
import AddressInput from "@/components/AddressInput"



export default function UserForm({ user, onSave }) {
    const [userName, setUserName] = useState(user?.name || '' );
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const { data: loggedInUserData } = useProfile();

    function handleAddressChange(propName, value){
        if (propName === 'phone') setPhone(value)
        if (propName === 'streetAddress') setStreetAddress(value)
        if (propName === 'postalCode') setPostalCode(value)
        if (propName === 'city') setCity(value)
        if (propName === 'country') setCountry(value)
    }
   
    return (
        <div className="md:flex gap-4 ">
            <div >
                <div className="relative p-2 rounded-lg max-w-[120px]">
                    <EditableImage link={image} setLink={setImage} />
                </div>
            </div>
            <form className="grow" onSubmit={e => onSave(e, { name:userName, image, phone, streetAddress, postalCode, city, country, admin })}>
                <label>First and Last name</label>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="First & Last Name" />
                <label>Email</label>
                <input type="email" disabled={true} value={user?.email} />
               <AddressInput addressProps={{phone, streetAddress, postalCode, city, country}} setAddressProp={handleAddressChange}/>
                {loggedInUserData.admin && (
                    <div >
                        <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor='adminCb'>
                            <input id="adminCb" type="checkbox" className="" value={'1'}
                                checked={admin}
                                onChange={e => setAdmin(e.target.checked)}
                            />
                            <span>Admin</span>
                        </label>
                    </div>
                )}

                <button type="submit" className="button">Save</button>
            </form>
        </div>
    )
}