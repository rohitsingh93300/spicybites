'use client'
import { useSession } from "next-auth/react"
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
// import InfoBox from "@/components/InfoBox"
// import SuccessBox from "@/components/SuccessBox"
import toast from "react-hot-toast";
import UserTabs from "@/components/UserTabs"
import EditableImage from "@/components/EditableImage"


function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('')
    const [image, setImage] = useState('')
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('')
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);

    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name)
            setImage(session.data.user.image)
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                })
            })
        }
    }, [session, status]);

    const handleProfileInfoUpdate = async (e) => {
        e.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: userName,
                    image,
                    phone,
                    streetAddress,
                    postalCode,
                    city,
                    country,
                }),
            });
            if (response.ok)
                resolve()
            else
                reject();

        })
        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error',
        })
    }

    if (status === 'loading' && !profileFetched) {
        return 'Loading...';
    }
    if (status === 'unauthenticated') {
        return redirect('/login');
    }
   
    // const userImage = session.data.user.image
    return (
        <section className='container mx-auto mt-12'>
           <UserTabs isAdmin={isAdmin}/>
            {/* <h1 className='text-center text-4xl font-semibold '>Profile</h1> */}

            <div className="max-w-md mt-8 mx-auto ">

                <div className="flex gap-2 ">
                    <div >
                        <div className="relative p-2 rounded-lg max-w-[120px]">
                           <EditableImage link={image} setLink={setImage}/>
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <label>First and Last name</label>
                        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="First & Last Name" />
                        <label>Email</label>
                        <input type="email" disabled={true} value={session.data.user.email} />
                        <label>Phone</label>
                        <input type="tel" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <label>Street Address</label>
                        <input type="text" placeholder="Street Address" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />
                        <div className="flex gap-4">
                            <div>
                                <label>Postal Code</label>
                                <input type="text" placeholder="Postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                            </div>
                            <div>
                                <label>City</label>
                                <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                        </div>
                        <label>Country</label>
                        <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                        <button type="submit" className="button">Save</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ProfilePage
