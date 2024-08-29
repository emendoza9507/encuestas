import DialogModal from "@/Components/DialogModal";
import Trash from "@/Components/icons/Trash";
import Respuesta from "@/Models/Respuesta";
import { useForm } from "@inertiajs/react";
import React, { PropsWithChildren, useState } from "react";
import route from "ziggy-js";

interface Props {
    respuesta: Respuesta,
    onDeleted?: () => void
}

export default function EliminarRespuesta({respuesta, onDeleted}: PropsWithChildren<Props>) {
    const [openDeleteRespuesta, setOpenDeleteRespuesta] = useState(false);

    const form =  useForm();

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        form.delete(route('respuesta.destroy', { respuestum: respuesta.id }), {
            onSuccess(res) {
                onDeleted && onDeleted()
                setOpenDeleteRespuesta(false)
            }
        })
    }

    return (
        <section>
            <button type='button' className='bg-red-600 p-2 text-gray-300 mb-4 hover:bg-red-400' onClick={() => setOpenDeleteRespuesta(true)}>
                <Trash/>
            </button>
            <DialogModal isOpen={openDeleteRespuesta} onClose={() => setOpenDeleteRespuesta(false)}>
                <form onSubmit={onSubmit}>
                    <DialogModal.Content title='Eliminar respuesta'>
                        <div>
                            <p>Esta seguro que desea eliminar la respuesta?</p>
                        </div>
                    </DialogModal.Content>
                    <DialogModal.Footer>
                        <div className='inputBx !m-0'>
                            <button type="submit">
                                Eliminar
                            </button>
                        </div>
                    </DialogModal.Footer>
                </form>
            </DialogModal>
        </section>
    )
}
