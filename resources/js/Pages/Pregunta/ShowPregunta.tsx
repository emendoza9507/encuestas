import AppLayout from '@/Layouts/AppLayout';
import Pregunta from '@/Models/Pregunta';
import { User } from '@/types';
import React, { useState } from 'react';
import AgregarRespuesta from '../Respuesta/AgragarRespuesta';
import ListRespuestasPorPregunta from '../Respuesta/ListRespuestasPorPregunta';
import Respuesta from '@/Models/Respuesta';
import EliminarRespuesta from '../Respuesta/EliminarRespuesta';

interface Props {
    pregunta: Pregunta
    auth: {
        user: User
    }
}

export default function ShowPregunta({pregunta, auth, ...rest}: Props) {
    const canAgregarRespuesta = pregunta.encuesta?.created_by == auth.user.id
    const [respuestaMaracada, setRespuestaMarcada] = useState<Respuesta>()

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
                        <div className='flex gap-2'>
                            <AgregarRespuesta pregunta={pregunta}/>
                            {respuestaMaracada && <EliminarRespuesta respuesta={respuestaMaracada} onDeleted={() => setRespuestaMarcada(undefined)}/>}
                        </div>
                    ) }

                    <ListRespuestasPorPregunta pregunta={pregunta} onSelectRespuesta={(respuesta) => setTimeout(() => {setRespuestaMarcada(respuesta)}, 10) }/>
                </div>
            </div>
        </AppLayout>
    )
}
