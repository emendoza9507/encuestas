import DialogModal from "@/Components/DialogModal";
import Pregunta from "@/Models/Pregunta";
import Respuesta from "@/Models/Respuesta";
import { Auth, User } from "@/types";
import { useForm } from "@inertiajs/react";
import React, { PropsWithChildren, useContext, useEffect, useState } from "react";
import route from "ziggy-js";
import RespuestaUserContext from "./context/RespuestaUserContext";

interface Props {
    pregunta: Pregunta
    respuesta: Respuesta
    auth: Auth
}

export default function CrearRespuestDeUsuario({ pregunta, auth }: PropsWithChildren<Props>) {
    const [openFormularioRepuesta, setOpenFormularioRespuesta] = useState(false);
    const { respuestaMarcada } = useContext(RespuestaUserContext);

    const form = useForm({
        encuesta_id: pregunta.encuesta_id,
        pregunta_id: pregunta.id,
        respuesta_id: respuestaMarcada?.id,
        user_id: auth.user?.id,
        text: ''
    })

    useEffect(() => {
        form.setData('respuesta_id', respuestaMarcada?.id);
    }, [respuestaMarcada])


    // if (!tipoPregunta) return null


    function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        form.post(route('respuesta_user.store'), {
            onSuccess(res) {
                setOpenFormularioRespuesta(false);
            }
        })
    }


    return (
        <div>
            <button type='button' className='bg-green-600 p-2 text-gray-300 mb-4 hover:bg-green-400' onClick={() => setOpenFormularioRespuesta(true)}>Responder</button>
            <DialogModal isOpen={openFormularioRepuesta} onClose={() => setOpenFormularioRespuesta(false)}>
                <form onSubmit={onSubmit}>
                    <DialogModal.Content title='Responder'>
                        <p className="mb-4">{respuestaMarcada?.text}</p>
                        <div className="inputBx !m-0 !w-full">
                            <span></span>
                            <textarea name="" id="" onChange={e => form.setData('text', e.currentTarget.value)} placeholder="Argumente su respuesta si es necesatio"></textarea>
                        </div>
                    </DialogModal.Content>
                    <DialogModal.Footer>
                        <div className='inputBx !m-0'>
                            <button type="submit">
                                Responder
                            </button>
                        </div>
                    </DialogModal.Footer>
                </form>
            </DialogModal>
        </div>
    )
}
