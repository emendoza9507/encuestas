import DialogModal from '@/Components/DialogModal';
import AppLayout from '@/Layouts/AppLayout';
import Encuesta from '@/Models/Encuesta';
import TipoPregunta from '@/Models/TipoPregunta';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import route from 'ziggy-js';
import List from '../Pregunta/ListPreguntas';
import ListPreguntas from '../Pregunta/ListPreguntas';
import { User } from '@/types';
import DocumentList from '@/Components/icons/DocumentList';
import Users from '@/Components/icons/Users';
import Question from '@/Components/icons/Question';
import Pregunta from '@/Models/Pregunta';

interface Props {
    encuesta: Encuesta,
    preguntas: Pregunta[],
    tipos_pregunta: TipoPregunta[],
    auth: {
        user: User
    }
}

export default function Detail({ encuesta, tipos_pregunta, preguntas, auth }: Props) {
    const [openNewQuestionModal, setOpenNewQuestionModal] = useState(false)
    const { post, setData, errors } = useForm({
        text: '',
        tipo_pregunta_id: tipos_pregunta[0].id,
        encuesta_id: encuesta.id
    })

    function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        post(route('pregunta.store'), {
            onSuccess: () => setOpenNewQuestionModal(false)
        })
    }

    console.log(encuesta)

    const canAddQuestion = auth.user.id == encuesta.created_by;

    return (
        <AppLayout title='Encuesta'>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className='flex gap-2 items-center text-white text-2xl uppercase'>
                        <DocumentList/>
                        {encuesta.title}
                    </h1>
                    <p className='text-white opacity-45 mb-4'>{encuesta.description}</p>


                    <ul className='mb-2 text-green-200 flex gap-2'>
                        <li className='flex gap-1 items-center'><Users title='Participantes'/> {encuesta.participantes?.length}</li>
                        <li className='flex gap-1 items-center'><Question title='Preguntas'/> {encuesta.preguntas?.length}</li>
                    </ul>

                    {canAddQuestion && <button type='button' className='bg-blue-600 p-2 text-gray-300 mb-4 hover:bg-blue-400' onClick={() => setOpenNewQuestionModal(true)}>Agregar pregunta</button>}

                    <ListPreguntas encuesta={encuesta} preguntas={preguntas}/>

                    <DialogModal isOpen={openNewQuestionModal} onClose={() => setOpenNewQuestionModal(false)}>
                        <form onSubmit={onSubmit}>
                            <DialogModal.Content title='Agregar pregunta'>
                                <div className='inputBx !w-full'>
                                    <span></span>
                                    <textarea onChange={(e) => setData('text', e.currentTarget.value)} placeholder='Pregunta para la encuesta' />
                                </div>
                                <div className='inputBx !w-full !mb-5'>
                                    <span></span>
                                    <label className='!text-black !opacity-100' htmlFor="">Tipo de Pregunta</label>
                                    <select defaultValue={tipos_pregunta[0].id} onChange={(e) => setData('tipo_pregunta_id', e.currentTarget.value)}>
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
                        </form>
                    </DialogModal>
                </div>
            </div>
        </AppLayout>
    )
}
