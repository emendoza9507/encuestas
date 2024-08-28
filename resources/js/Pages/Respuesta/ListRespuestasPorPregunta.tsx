import Pregunta from "@/Models/Pregunta"
import React, { PropsWithChildren } from "react"

interface Props {
    pregunta: Pregunta
}

export default function ListRespuestasPorPregunta({
    pregunta,
}: PropsWithChildren<Props>) {
    return (
        <section>
            <div className='flex justify-between font-bold text-gray-300'>
                <h4 className='font-bold text-gray-300'>Posibles respuestas:</h4>
                <span>{pregunta.respuestas?.length}</span>
            </div>
            <hr className='mb-4' />
            {pregunta.respuestas.map(respuesta => (
                <p>{respuesta.text}</p>
            ))}
        </section>
    )
}
