import { useState } from "react";

export default function DeleteButton({ label, onDelete }) {
    const [showConfirm, setShowConfirm] = useState(false);

    if (showConfirm) {
        return (
            <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
                <div className="bg-white p-4 rounded-lg">
                    <div>Are you sure you want to delete?</div>
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => setShowConfirm(false)}
                            className="button" type="button">
                            Cancel
                        </button>
                        <button
                            onClick={() => { onDelete(); setShowConfirm(false); }}
                            className="primary button"
                            type="button">
                            Yes,&nbsp;delete!
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <button
            onClick={() => setShowConfirm(true)}
            className="button"
            type="button">
            {label}
        </button>
    );
}