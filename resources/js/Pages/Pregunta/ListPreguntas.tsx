import FolderOpen from '@/Components/icons/FolderOpen';
import Pencil from '@/Components/icons/Pencil';
import Question from '@/Components/icons/Question';
import Pagination, { PaginationProps } from '@/Components/Pagination';
import Encuesta from '@/Models/Encuesta';
import Pregunta from '@/Models/Pregunta';
import { router } from '@inertiajs/core';
import { Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import route from 'ziggy-js';
import Edit from './Edit';
import Delete from './Delete';
import useRoute from '@/Hooks/useRoute';
import { Auth } from '@/types';
import UserContext from '@/Contexts/UserContext';

interface Props {
    auth: Auth
    encuesta: Encuesta,
    preguntas: PaginationProps<Pregunta>
}

interface PreguntaItemProps {
    pregunta: Pregunta,
    index: number
}

function PreguntaItem({ pregunta, index }: PreguntaItemProps) {
    const [respuestas, setRespuestas] = useState([])
    const form = useForm();
    const { auth } = useContext(UserContext);

    useEffect(() => {
        axios.get(route('api.pregunta.show', { preguntum: pregunta.id }))
            .then(res => {
                setRespuestas(res.data.pregunta.respuestas)
            })
    }, [])

    return (
        <article className='mb-4 bg-gray-600 text-white shadow-xl hover:shadow-red-500 hover:scale-105 transition'>
            <div className='p-3 flex gap-1' onClick={() => router.visit(route('pregunta.show', { preguntum: pregunta.id }))}>
                <Question/>
                {pregunta.text}
            </div>
            <footer className={`flex justify-between p-3 bg-gray-700`}>
                <div className='flex gap-3 '>
                    <Link href={route('pregunta.show', { preguntum: pregunta.id })}>
                        <FolderOpen />
                    </Link>
                    <span className='flex gap-2'>
                        <Pencil /> {respuestas.length}
                    </span>
                </div>
                <div className='flex gap-3'>
                    {auth.permissions.encuesta?.update && <Edit pregunta={pregunta}/>}
                    {auth.permissions.encuesta?.delete && <Delete pregunta={pregunta}/>}
                </div>
            </footer>
        </article>
    )
}

export default function ListPreguntas({ encuesta, preguntas}: Props) {
    return (
        <section>
            <div className='flex justify-between font-bold text-gray-300'>
                <h4 className='font-bold text-gray-300'>Preguntas de la encuesta:</h4>
            </div>
            <hr className='mb-4' />


            {preguntas.data.map((pregunta, index) => (
                <PreguntaItem index={index + 1} key={pregunta.id} pregunta={pregunta} />
            ))}

            <Pagination options={{ ...preguntas, name: 'preguntas' }} />

        </section>
    )
}
