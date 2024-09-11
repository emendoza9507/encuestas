import Respuesta from "@/Models/Respuesta";
import React from "react";

interface Props {
    respuesta: Respuesta
    name: string,
    checked?: () => boolean
    onChecked: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function RespuestaView( {respuesta, name, onChecked, checked}: Props ) {
    return (
        <label className="flex gap-2 mb-4 text-white opacity-65">
            <input
                className="relative top-1"
                type="radio"
                name={name}
                value={respuesta.id}
                onChange={onChecked}/>
            <span>{respuesta.text}</span>
        </label>
    )
}
