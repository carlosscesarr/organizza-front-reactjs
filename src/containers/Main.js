import React from 'react'

export default function Main({ children }) {
    return (
        <div className="h-full overflow-y-auto">
            <div className="container grid px-6 mx-auto">{children}</div>
        </div>
    )
}