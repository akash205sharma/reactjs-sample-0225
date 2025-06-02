'use client';

import { useState } from 'react';

export default function Popup() {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div>
            {/* Button to open popup */}
            <button
                onClick={() => setShowPopup(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Open Popup
            </button>

            {/* Popup overlay */}
            {showPopup && (
                <div className=" flex items-center justify-center fixed inset-0 bg-black/50 z-75">
                    <div className="bg-white opacity-100 p-6 rounded-lg shadow-xl min-w-[300px]">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowPopup(false)}
                            className="text-red-500 float-right font-bold"
                        >
                            ✖
                        </button>

                        {/* Popup Content */}
                        <h2 className="text-xl font-semibold mb-4">Popup Content</h2>
                        <div>
                            <p>This is your custom content inside the popup.</p>
                            {/* You can render any component or divs here */}
                            <div className="mt-4 p-4 border rounded">
                                <p>📦 Task Info or Input Fields</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
