import AppLayout from '@/Layouts/AppLayout';
import Pregunta from '@/Models/Pregunta';
import { Auth, User } from '@/types';
import React, { createContext, useEffect, useState } from 'react';
import AgregarRespuesta from '../Respuesta/AgragarRespuesta';
import ListRespuestasPorPregunta from '../Respuesta/ListRespuestasPorPregunta';
import Respuesta from '@/Models/Respuesta';
import EliminarRespuesta from '../Respuesta/EliminarRespuesta';
import CrearRespuestDeUsuario from './CrearRespuestaDeUsuario';
import DocumentList from '@/Components/icons/DocumentList';
import Question from '@/Components/icons/Question';
import RespuestaUser from '@/Models/RespuestaUser';
import RespuestaItem from '../Respuesta/partial/RespuestaItem';
import RespuestaUserContext from './context/RespuestaUserContext';

interface IPregunta extends Pregunta {
    respuestas: Respuesta[]
}

interface Props {
    pregunta: IPregunta
    auth: {
        user: User
    }
    respuesta_user: RespuestaUser
}

export default function ShowPregunta({ pregunta, auth, respuesta_user }: Props) {
    const canAgregarRespuesta = pregunta.encuesta?.created_by == auth.user.id
    const canResponderPregunta = true
    const [respuestaMaracada, setRespuestaMarcada] = useState<Respuesta>()
    const respuestaUser = pregunta.respuestas && respuesta_user && pregunta.respuestas.find((respuesta) => respuesta.id == respuesta_user.respuesta_id)
    const respuestaUserIndex = pregunta.respuestas && respuesta_user && pregunta.respuestas.findIndex((respuesta) => respuesta.id == respuesta_user.respuesta_id) + 1

    return (
        <RespuestaUserContext.Provider value={{respuestaMarcada: respuestaMaracada, setRespuestaMarcada: setRespuestaMarcada}}>
            <AppLayout title='Pregunta'>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <h3 className='text-gray-300 text-xl flex gap-2'>
                            <DocumentList />
                            {pregunta.encuesta?.title}
                        </h3>
                        <p className='text-white text-sm uppercase mb-4 flex gap-2'>
                            <Question />
                            {pregunta.text}
                        </p>


                        <div className='flex gap-2 flex-wrap'>
                            {canAgregarRespuesta && (
                                <>
                                    <AgregarRespuesta pregunta={pregunta} />
                                    {respuestaMaracada && (
                                        <>
                                            <EliminarRespuesta respuesta={respuestaMaracada} onDeleted={() => setRespuestaMarcada(undefined)} />
                                        </>
                                    )}
                                </>
                            )}

                            {(respuestaMaracada && canResponderPregunta) && (
                                <CrearRespuestDeUsuario auth={auth} pregunta={pregunta} respuesta={respuestaMaracada} />
                            )}

                        </div>

                        <ListRespuestasPorPregunta pregunta={pregunta}  />


                        <section className="mt-4">
                            <div className='flex justify-between font-bold text-gray-300'>
                                <h4 className='font-bold text-gray-300'>Tu respuesta:</h4>
                                <span></span>
                            </div>
                            <hr className='mb-4' />

                            {respuestaUser && (
                                <>
                                <RespuestaItem active respuesta={respuestaUser} index={respuestaUserIndex} />
                                <p className='px-5 text-gray-200 opacity-60'>{respuesta_user.text}</p>
                                </>
                            )}
                        </section>
                    </div>
                </div>
            </AppLayout>
        </RespuestaUserContext.Provider>
    )
}
