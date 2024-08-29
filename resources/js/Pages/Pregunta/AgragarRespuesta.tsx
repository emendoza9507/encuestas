import DialogModal from "@/Components/DialogModal"
import Pregunta from "@/Models/Pregunta";
import Respuesta from "@/Models/Respuesta";
import { useForm } from "@inertiajs/react";
import React, { PropsWithChildren, useState } from "react"
import route from "ziggy-js";

interface Props {
    pregunta: Pregunta
    onRespuestaCreada?: ( respuesta: Respuesta ) => void,
}

export default function AgregarRespuesta({ pregunta, onRespuestaCreada }: PropsWithChildren<Props>) {
    const [openNewRespuesta, setOpenNewRespuesta] = useState(false);
    const { post, setData, errors } = useForm({
        pregunta_id: pregunta.id,
        text: ''
    })

    function onSubmit(e: React.FormEvent) {
        e.preventDefault()

        post(route('respuesta.store'), {
            onError: () => {},
            onSuccess: (res: any) => {
                onRespuestaCreada && onRespuestaCreada(res.respuesta)
                setOpenNewRespuesta(false)
            }
        })
    }

    return (
        <section>
            <button type='button' className='bg-blue-600 p-2 text-gray-300 mb-4 hover:bg-blue-400' onClick={() => setOpenNewRespuesta(true)}>Agregar respuesta</button>
            <DialogModal isOpen={openNewRespuesta} onClose={() => setOpenNewRespuesta(false)}>
                <form onSubmit={onSubmit}>
                    <DialogModal.Content title='Nueva respuesta'>
                        <div className='inputBx !w-full'>
                            <span className={errors.text ? 'error': ''}></span>
                            <textarea onChange={(e) => setData('text', e.currentTarget.value)} placeholder='Agregar respuesta para la pregunta' />
                        </div>
                    </DialogModal.Content>
                    <DialogModal.Footer>
                        <div className='inputBx !m-0'>
                            <button type="submit">
                                Agregar
                            </button>
                        </div>
                    </DialogModal.Footer>
                </form>
            </DialogModal>
        </section>
    )
}
