import DialogModal from '@/Components/DialogModal';
import AppLayout from '@/Layouts/AppLayout';
import Encuesta from '@/Models/Encuesta';
import TipoPregunta from '@/Models/TipoPregunta';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import route from 'ziggy-js';

interface Props {
    encuesta: Encuesta,
    tipos_pregunta: TipoPregunta[]
}

export default function Detail({ encuesta, tipos_pregunta }: Props) {
    const [openNewQuestionModal, setOpenNewQuestionModal] = useState(false)
    const { post, setData, errors } = useForm({
        pregunta: '',
        tipo_pregunta: '',
        encuesta_id: encuesta.id
    })

    function onSubmit(e: React.FormEvent) {
        console.log('entro')
        post(route('pregunta.store'), {
            onSuccess: () => setOpenNewQuestionModal(true)
        })
    }

    return (
        <AppLayout title='Encuesta'>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className='text-white text-2xl uppercase'>
                        {encuesta.title}
                    </h1>

                    <p className='text-white opacity-45'>{encuesta.description}</p>

                    <button type='button' onClick={() => setOpenNewQuestionModal(true)}>Agregar pregunta</button>

                    <form onSubmit={onSubmit}>
                        <DialogModal isOpen={openNewQuestionModal} onClose={() => setOpenNewQuestionModal(false)}>
                            <DialogModal.Content title='Agregar pregunta'>
                                <div className='inputBx !w-full'>
                                    <span></span>
                                    <textarea onChange={(e) => setData('pregunta', e.currentTarget.value)} placeholder='Pregunta para la encuesta' />
                                </div>
                                <div className='inputBx !w-full !mb-5'>
                                    <span></span>
                                    <label className='!text-black !opacity-100' htmlFor="">Tipo de Pregunta</label>
                                    <select onChange={(e) => setData('tipo_pregunta', e.currentTarget.value)}>
                                        {tipos_pregunta?.map(({ id, tipo }) => (
                                            <option key={id} value={id} className='text-black'>{tipo}</option>
                                        ))}
                                    </select>
                                </div>
                            </DialogModal.Content>
                            <DialogModal.Footer>
                                <div className='inputBx !m-0'>
                                    <button type="submit">
                                        Agregar
                                    </button>
                                </div>
                            </DialogModal.Footer>
                        </DialogModal>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}
