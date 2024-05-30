'use client'
import { useSession } from "next-auth/react"
import UserForm from "@/components/UserForm"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
// import InfoBox from "@/components/InfoBox"
// import SuccessBox from "@/components/SuccessBox"
import toast from "react-hot-toast";
import UserTabs from "@/components/UserTabs"



function ProfilePage() {
    const session = useSession();
    const [user, setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);

    const { status } = session;
    console.log('user',user);

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUser(data);
                    setIsAdmin(data.admin);
                    setProfileFetched(true)
                })
            })
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(e, data) {
        e.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify(data),
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

    if (status === 'loading' || !profileFetched) {
        return 'Loading...';
    }
    if (status === 'unauthenticated') {
        return redirect('/login');
    }
   
    return (
        <section className='container mx-auto mt-12'>
           <UserTabs isAdmin={isAdmin}/>

            <div className="max-w-2xl mt-8 mx-auto ">
               <UserForm user={user} onSave={handleProfileInfoUpdate}/>
                 
            </div>
        </section>
    )
}

export default ProfilePage
