import Check from "@/Components/icons/Check"
import Pregunta from "@/Models/Pregunta"
import Respuesta from "@/Models/Respuesta"
import React, { PropsWithChildren, useState } from "react"

interface Props {
    pregunta: Pregunta,
    onSelectRespuesta?: (respuesta: Respuesta) => void
}

interface ItemProps {
    respuesta: Respuesta,
    index: number,
    active?: boolean
    onClick?: () => void
}

function RespuestaItem({respuesta, index, active, onClick}: PropsWithChildren<ItemProps>) {
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

export default function ListRespuestasPorPregunta({
    pregunta,
    onSelectRespuesta
}: PropsWithChildren<Props>) {
    const [respuestaMarcada, setRespuestaMarcada] = useState<Respuesta>();

    function handleMarcarRespuesta(respuesta: Respuesta) {
        setRespuestaMarcada((prevState: Respuesta | undefined) => {
            onSelectRespuesta && onSelectRespuesta(respuesta);
            return respuesta
        })
    }

    return (
        <section>
            <div className='flex justify-between font-bold text-gray-300'>
                <h4 className='font-bold text-gray-300'>Posibles respuestas:</h4>
                <span>{pregunta.respuestas?.length}</span>
            </div>
            <hr className='mb-4' />
            {pregunta.respuestas?.map((respuesta, index) => (
                <RespuestaItem active={respuestaMarcada?.id === respuesta.id} key={respuesta.id} onClick={() => handleMarcarRespuesta(respuesta)} respuesta={respuesta} index={index + 1}/>
            ))}
        </section>
    )
}
