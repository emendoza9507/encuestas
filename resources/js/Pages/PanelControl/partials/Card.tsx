import React from "react";

interface Props {
    title: string
    body: string
    className?: string
}

export default function Card({title, body, className}: Props) {
    return (
        <article className={"h-36 shadow-xl w-96 relative hover:shadow-2xl ".concat(className ?? "")}>
            <header className="h-full flex text-2xl items-center justify-center">
                <span className="relative text-white tracking-widest -top-3">{body}</span>
            </header>
            <footer className="absolute text-center border-t p-2 bottom-0 bg-red-800 text-white text-opacity-60 w-full h-10 ">
                <span className="uppercase tracking-widest">{title}</span>
            </footer>
        </article>
    )
}
