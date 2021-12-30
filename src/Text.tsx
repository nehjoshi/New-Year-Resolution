import React from 'react'
import "./App.css";

interface Props {
    text: string,
    id?: number
}

export const Text: React.FC <Props> = ({text, id}) =>{
    return (
        <div>
            <h1>{text}</h1>
            <p>{id}</p>
        </div>
    )
}
