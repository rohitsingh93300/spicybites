import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
    const handleFileChange = async (e) => {
        const files = e.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0])
            const uploadPromise = new Promise(async (resolve, reject) => {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: data,
                });
                if (response.ok) {
                    const link = await response.json();
                    setLink(link)
                    resolve();
                }
                else
                    reject();
            })
            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Upload Complete!',
                error: 'Upload Error'
            })

        }
    }
    return (
        <>
            {link && (

                <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt='profile' />
            )}
            {!link && (
                <div className="bg-gray-200 p-4 text-gray-500 text-center rounded-lg mb-1">
                    No Image
                </div>
            )}
            <label>
                <input type="file" className="hidden" onChange={handleFileChange} />
                <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Edit</span>
            </label>
        </>
    )
}