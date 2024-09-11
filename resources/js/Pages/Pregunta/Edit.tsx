import DialogModal from "@/Components/DialogModal";
import Pregunta from "@/Models/Pregunta";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import EncuestaContext from "../Encuesta/context/EncuestaContext";
import Trash from "@/Components/icons/Trash";
import EditIcon from "@/Components/icons/Edit";
import route from "ziggy-js";
import Swal from "sweetalert2";

interface EditProps {
    pregunta: Pregunta
}

export default function Edit({ pregunta }: EditProps) {
    const [openEditPregunta, setEditPregunta] = useState(false);
    const { put, data, setData } = useForm(pregunta)

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        put(route('pregunta.update', { preguntum: pregunta.id }), {
            onError() {
                Swal.fire({
                    title: 'Error!',
                    text: 'Ha ocurrido un error inesperado, revise los datos.',
                    icon: 'error'
                })
            },
            onSuccess() {
                Swal.fire({
                    text: 'Datos guardados correctamente',
                    icon: 'success',
                })
            },
            onFinish() {
                setEditPregunta(false)
            }
        })
    }

    return (
        <EncuestaContext.Consumer children={({tiposDePreguntas}) => (
            <React.Fragment>
                <button className="text-yellow-400" onClick={() => setEditPregunta(true)}>
                    <EditIcon />
                </button>

                <DialogModal isOpen={openEditPregunta} onClose={() => setEditPregunta(false)}>
                    <form onSubmit={handleSubmit}>
                        <DialogModal.Content title='Editar pregunta'>
                            <div className='inputBx !w-full'>
                                <span></span>
                                <textarea onChange={(e) => setData('text', e.currentTarget.value)} value={data.text} placeholder='Pregunta para la encuesta' />
                            </div>
                            <div className='inputBx !w-full !mb-5'>
                                <span></span>
                                <label className='!text-black !opacity-100' htmlFor="">Tipo de Pregunta</label>
                                <select defaultValue={data.tipo_pregunta_id} onChange={(e) => setData('tipo_pregunta_id', e.currentTarget.value)}>
                                    {tiposDePreguntas?.map(({ id, tipo }) => (
                                        <option key={id} value={id} className='text-black'>{tipo}</option>
                                    ))}
                                </select>
                            </div>
                        </DialogModal.Content>
                        <DialogModal.Footer>
                            <div className='inputBx !m-0'>
                                <button type="submit">
                                    Guardar
                                </button>
                            </div>
                        </DialogModal.Footer>
                    </form>
                </DialogModal>
            </React.Fragment>
        )}>
        </EncuestaContext.Consumer>
    )
}
