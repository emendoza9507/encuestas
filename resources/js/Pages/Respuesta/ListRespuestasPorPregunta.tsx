import Check from "@/Components/icons/Check"
import Pregunta from "@/Models/Pregunta"
import Respuesta from "@/Models/Respuesta"
import React, { PropsWithChildren, useContext, useState } from "react"
import RespuestaItem from "./partial/RespuestaItem"
import RespuestaUserContext from "../Pregunta/context/RespuestaUserContext"

interface Props {
    pregunta: Pregunta,
    onSelectRespuesta?: (respuesta: Respuesta) => void
}


export default function ListRespuestasPorPregunta({
    pregunta,
    onSelectRespuesta
}: PropsWithChildren<Props>) {
    // const [respuestaMarcada, setRespuestaMarcada] = useState<Respuesta>();

    const { respuestaMarcada, setRespuestaMarcada } = useContext(RespuestaUserContext)

    function handleMarcarRespuesta(respuesta: Respuesta) {
        setRespuestaMarcada(respuesta);
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
