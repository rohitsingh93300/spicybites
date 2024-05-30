'use client'
import { useProfile } from "@/components/UseProfile"
import UserForm from "@/components/UserForm"
import UserTabs from "@/components/UserTabs"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


export default function EditUserPage() {
    const { loading, data } = useProfile()
    const [user, setUser] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        fetch('/api/profile?_id=' + id).then(res => {
            res.json().then(user => {
                setUser(user)
            })
        })
    }, [])
    async function handleSaveButtonClick(e, data) {
        e.preventDefault();
        const promise = new Promise(async (resolve, reject) => {
            const res = fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, _id: id }),
            });
            if (res.ok)
                resolve()
            else
                reject()
        });
        await toast.promise(promise, {
            loading: 'Saving user...',
            success: 'User saved',
            error: 'An error has occured while saving the user',
        });

    }

    if (loading) {
        return <div className="grid place-items-center h-[400px]">
        <Image className="w-[300px]" src={'/foodLoader.gif'} alt='foodloading' height={100} width={100}/>
    </div>
    }
    if (!data.admin) {
        return "Not an admin";
    }
    return (
        <section className="mt-12 mx-auto max-w-2xl">
            <UserTabs isAdmin={true} />
            <div className="mt-8 px-4 md:px-0">
                <UserForm user={user} onSave={handleSaveButtonClick} />
            </div>
        </section>
    )
}