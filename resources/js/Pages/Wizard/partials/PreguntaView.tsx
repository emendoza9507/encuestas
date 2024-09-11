import Pregunta from "@/Models/Pregunta";
import React, { useEffect, useState } from "react";
import RespuestaView from "./RespuestaView";
import { useForm, usePage } from "@inertiajs/react";
import { Auth } from "@/types";
import Back from "@/Components/icons/Back";
import Next from "@/Components/icons/Next";
import SendSolid from "@/Components/icons/SendSolid";
import route from "ziggy-js";
import axios from "axios";
import Swal from "sweetalert2";

interface Props {
    isLast: boolean
    isFirst: boolean
    pregunta: Pregunta
    onSubmited: () => void
    onBack: () => void
}

export default function PreguntaView({ pregunta, isLast, isFirst, onSubmited, onBack }: Props) {
    const page = usePage<any>();
    const [state, setState] = useState<{
        user_id: string,
        encuesta_id: string,
        pregunta_id: string,
        respuesta_id: string | undefined,
        text: string
    }>({
        user_id: page.props.auth.user.id,
        encuesta_id: pregunta.encuesta_id,
        pregunta_id: pregunta.id,
        respuesta_id: undefined,
        text: ''
    })

    const form = useForm<{
        user_id: string,
        encuesta_id: string,
        pregunta_id: string,
        respuesta_id: string | undefined,
        text: string
    }>(state)

    useEffect(() => {
        setState({...state, pregunta_id: pregunta.id, respuesta_id: undefined})
    }, [pregunta.id])

    useEffect(() => {
        form.setData(state)
    },[state])

    const onChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, respuesta_id: e.currentTarget.value})
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('asd');
        form.post(route('respuesta_user.store'), {
            onError() {
                Swal.fire({
                    title: 'Error!',
                    text: 'Por favor selecciones una respuesta y argumente de ser necesario!',
                    icon: 'error'
                })
            },
            onSuccess() {
                onSubmited();
            }
        })
    }


    return (
        <form onSubmit={onSubmit}>
            <p className="text-white text-xl mb-4">{pregunta.text}</p>

            {pregunta.respuestas?.map((respuesta, index, arr) => (
                <RespuestaView key={respuesta.id} name="respuesta" onChecked={onChecked} respuesta={respuesta} />
            ))}

            <div className="inputBx !my-8  !w-full">
                <span></span>
                <textarea name="" id="" onChange={e => form.setData('text', e.currentTarget.value)} placeholder="Argumente su respuesta si es necesatio"></textarea>
            </div>

            <footer className="flex justify-between flex-row-reverse py-6">
                <button type="submit" className="text-white opacity-80 border-2 px-2 py-1 hover:opacity-100 flex items-center gap-2">
                    {!isLast ? (<>Siguinte <Next /> </>) : <>Finalizar <SendSolid className="" /> </>}
                </button>


                {!isFirst && (
                    <button type="button" className="text-white opacity-80 border-2 px-2 py-1 hover:opacity-100 flex items-center gap-2" onClick={onBack}>
                        <Back /> Atras
                    </button>
                )}
            </footer>
        </form>
    )
}
