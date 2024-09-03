import Check from "@/Components/icons/Check";
import useRoute from "@/Hooks/useRoute";
import useTypedPage from "@/Hooks/useTypedPage";
import Respuesta from "@/Models/Respuesta";
import CrearRespuestDeUsuario from "@/Pages/Pregunta/CrearRespuestaDeUsuario";
import { usePage } from "@inertiajs/react";
import React, { PropsWithChildren } from "react";

interface ItemProps {
    respuesta: Respuesta,
    index: number,
    active?: boolean
    onClick?: () => void
}


export default function RespuestaItem({respuesta, index, active, onClick}: PropsWithChildren<ItemProps>) {


    return (
        <article onClick={onClick} className="flex gap-2 group">

            <span className={`${!active ? 'text-gray-300' : 'text-red-300'} group-hover:text-red-300 relative`}>
                {active && <span className="absolute right-4"><Check/></span>}
                {index}.
            </span>
            <p className="text-gray-300 group-hover:text-red-300">{respuesta.text}</p>
        </article>
    )
}
