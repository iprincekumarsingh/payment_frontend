import React from 'react'

export default function Topbar({ title }) {
    return (
        <nav className=" border-gray-200 bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center item " >
                    {/* <img src={back_arrow} className="h-8 mr-3" alt="Flowbite Logo" width={30} /> */}
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">{title}</span>
                </a>


            </div>
        </nav>
    )
}
