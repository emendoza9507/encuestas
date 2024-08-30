import DialogModal from "@/Components/DialogModal";
import Pregunta from "@/Models/Pregunta";
import Respuesta from "@/Models/Respuesta";
import { User } from "@/types";
import { useForm } from "@inertiajs/react";
import React, { PropsWithChildren, useState } from "react";

interface Props {
    pregunta: Pregunta
    respuesta: Respuesta
    auth: {
        user: User
    }
}

export default function CrearRespuestDeUsuario({ pregunta, respuesta, auth }: PropsWithChildren<Props>) {
    const [openFormularioRepuesta, setOpenFormularioRespuesta] = useState(false);
    const form = useForm({
        respuesta_id: respuesta.id,
        user_id: auth.user.id,
        text: ''
    })
    const { tipoPregunta } = pregunta
    let contentModal = null

    // if (!tipoPregunta) return null


    function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        console.log('respondiendo')
    }


    return (
        <div>
            <button type='button' className='bg-green-600 p-2 text-gray-300 mb-4 hover:bg-green-400' onClick={() => setOpenFormularioRespuesta(true)}>Responder</button>
            <DialogModal isOpen={openFormularioRepuesta} onClose={() => setOpenFormularioRespuesta(false)}>
                <form onSubmit={onSubmit}>
                    <DialogModal.Content title='Responder'>
                        <p className="mb-4">{respuesta.text}</p>
                        <div className="inputBx !m-0 !w-full">
                            <span></span>
                            <textarea name="" id="" onChange={e => form.setData('text', e.currentTarget.value)} placeholder="Argumente su respuesta si es necesatio"></textarea>
                        </div>
                    </DialogModal.Content>
                    <DialogModal.Footer>
                        <div className='inputBx !m-0'>
                            <button type="submit">
                                Responeder
                            </button>
                        </div>
                    </DialogModal.Footer>
                </form>
            </DialogModal>
        </div>
    )
}
