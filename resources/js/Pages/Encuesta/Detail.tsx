import DialogModal from '@/Components/DialogModal';
import AppLayout from '@/Layouts/AppLayout';
import Encuesta from '@/Models/Encuesta';
import TipoPregunta from '@/Models/TipoPregunta';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import route from 'ziggy-js';
import List from '../Pregunta/ListPreguntas';
import ListPreguntas from '../Pregunta/ListPreguntas';
import { Auth, User } from '@/types';
import DocumentList from '@/Components/icons/DocumentList';
import Users from '@/Components/icons/Users';
import Question from '@/Components/icons/Question';
import Pregunta from '@/Models/Pregunta';
import { PaginationProps } from '@/Components/Pagination';
import EncuestaContext from './context/EncuestaContext';
import UserContext from '@/Contexts/UserContext';
import { router } from '@inertiajs/core';
import Trash from '@/Components/icons/Trash';
import Swal from 'sweetalert2';
import Stats from '@/Components/icons/Stats';

interface Props {
    encuesta: Encuesta,
    preguntas: PaginationProps<Pregunta>,
    tipos_pregunta: TipoPregunta[],
    auth: Auth,
    can: string[],
    roles: string[]
}

export default function Detail({ encuesta, tipos_pregunta, preguntas, auth, can, roles }: Props) {
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

    function hasPermissions(permisions: string[]) {
        return can.some(p => permisions.includes(p))
    }

    function hasRoles(rols: string[]) {
        return roles.some(p => rols.includes(p))
    }

    function handleClearEncuesta() {
        Swal.fire({
            title: 'Atención',
            text: 'Eliminara los datos relacionados con la encuesta',
            showCancelButton: true,
            backdrop: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalos!"
        }).then(resul => {
            if(resul.isConfirmed) {
                router.delete(route('encuesta.clear', { encuesta: encuesta.id }), {
                    onError() {},
                    onSuccess() {
                        Swal.fire({
                            icon: 'success',
                            text: 'La encuesta se ha inicializado satisfactoriamente!'
                        })
                    }
                })
            }
        })
    }

    function openParticipationList() {
        if(hasRoles(['Super-Admin', 'admin', 'encuestador'])) {
            router.visit(route('encuesta.participantes', { encuesta: encuesta.id }))
        }
    }

    return (
        <UserContext.Provider value={{ auth: auth, can: can, roles: roles, hasPermissions: hasPermissions, hasRoles: hasRoles }}>
            <EncuestaContext.Provider value={{ tiposDePreguntas: tipos_pregunta, setSetTiposDePreguntas() { } }}>
                <AppLayout title='Encuesta'>
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className='flex text-white text-3xl mb-4 items-center'><h1 className='text-5xl'>DETALLE DE LA ENCUESTA</h1></div>
                            <h1 className='flex gap-2 items-center text-white text-xl uppercase'>
                                {encuesta.title}
                            </h1>
                            <p className='text-white opacity-45 mb-4'>{encuesta.description}</p>


                            <ul className='mb-2 text-green-200 flex gap-2'>
                                <li className='flex gap-1 items-center' onClick={openParticipationList}><Users title='Participantes' />participantes: {encuesta.participantes?.length}</li>
                                <li className='flex gap-1 items-center'><Question title='Preguntas' />preguntas: {preguntas.total}</li>
                            </ul>

                            <div className='flex gap-2'>
                                {hasRoles(['Super-Admin', 'admin', 'encuestador']) && <button type='button' className='bg-blue-600 p-2 text-gray-300 mb-4 hover:bg-blue-700' onClick={() => setOpenNewQuestionModal(true)}>Agregar pregunta</button>}

                                {hasRoles(['Super-Admin', 'admin', 'encuestador']) &&
                                    <button
                                        type='button'
                                        className='bg-yellow-600 mx-2 p-2 text-gray-300 mb-4 hover:bg-yellow-700'
                                        onClick={() => router.visit(route('encuesta.stats', { encuesta: encuesta.id }))}>
                                        <span className='flex'><Stats/> Estadísticas</span>
                                    </button>}

                                {hasRoles(['Super-Admin', 'admin']) &&
                                    <button
                                        type='button'
                                        className='bg-red-600 mx-2 p-2 text-gray-300 mb-4 hover:bg-red-700'
                                        onClick={handleClearEncuesta}>
                                        <span className='flex'><Trash /> Limpiar</span>
                                    </button>}
                            </div>


                            <ListPreguntas encuesta={encuesta} auth={auth} preguntas={preguntas} />

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
            </EncuestaContext.Provider>
        </UserContext.Provider>
    )
}
