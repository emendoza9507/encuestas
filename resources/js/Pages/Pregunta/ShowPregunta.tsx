import AppLayout from '@/Layouts/AppLayout';
import Pregunta from '@/Models/Pregunta';
import { User } from '@/types';
import React, { useState } from 'react';
import AgregarRespuesta from './AgragarRespuesta';
import ListRespuestasPorPregunta from '../Respuesta/ListRespuestasPorPregunta';

interface Props {
    pregunta: Pregunta
    auth: {
        user: User
    }
}

export default function ShowPregunta({pregunta, auth}: Props) {
    console.log(pregunta);

    const canAgregarRespuesta = pregunta.encuesta?.created_by == auth.user.id

    return (
        <AppLayout title='Pregunta'>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h3 className='text-gray-300 text-xl'>
                        {pregunta.encuesta?.title}
                    </h3>
                    <p className='text-white text-sm uppercase mb-4'>
                        {pregunta.text}
                    </p>

                    { canAgregarRespuesta && (
                        <AgregarRespuesta pregunta={pregunta}/>
                    ) }

                    <ListRespuestasPorPregunta pregunta={pregunta}/>
                    {/* <p className='text-white opacity-45 mb-4'>{pregunta.description}</p> */}
                </div>
            </div>
        </AppLayout>
    )
}
