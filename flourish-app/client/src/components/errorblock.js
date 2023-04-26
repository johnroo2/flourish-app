import React from "react";

export default function ErrorBlock({text}){
    return(
        <div className="ml-[0.75em]">
            <p className="text-coral text-xs">{text}</p>
        </div>
    )
}