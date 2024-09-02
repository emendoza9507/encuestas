import FolderOpen from '@/Components/icons/FolderOpen';
import Question from '@/Components/icons/Question';
import Encuesta from '@/Models/Encuesta';
import Pregunta from '@/Models/Pregunta';
import { router } from '@inertiajs/core';
import { Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import route from 'ziggy-js';

interface Props {
    encuesta: Encuesta,
    preguntas: {
        data: Pregunta[]
    }
}

interface PreguntaItemProps {
    pregunta: Pregunta,
    index: number
}

function PreguntaItem({ pregunta, index }: PreguntaItemProps) {
    const [respuestas, setRespuestas] = useState([])
    const form = useForm();

    useEffect(() => {
        axios.get(route('api.pregunta.show', {preguntum: pregunta.id}))
        .then(res => {
            setRespuestas(res.data.pregunta.respuestas)
        })
    }, [])


    return (
        <article className='mb-4 bg-gray-600 text-white shadow-xl hover:shadow-red-500 hover:scale-105 transition'>
            <div className='p-3' onClick={() => router.visit(route('pregunta.show', { preguntum: pregunta.id }))}>{pregunta.text}</div>
            <footer className={`flex gap-3 p-3 bg-gray-700`}>
                <Link href={route('pregunta.show', { preguntum: pregunta.id })}>
                    <FolderOpen/>
                </Link>
                <span >
                    <Question/> : {respuestas.length}
                </span>
            </footer>
        </article>
    )
}

export default function ListPreguntas({ encuesta, preguntas }: Props) {

    console.log(preguntas)

    return (
        <section>
            <div className='flex justify-between font-bold text-gray-300'>
                <h4 className='font-bold text-gray-300'>Preguntas de la encuesta:</h4>
            </div>
            <hr className='mb-4' />


            {preguntas.data.map((pregunta, index) => (
                <PreguntaItem index={index + 1} key={pregunta.id} pregunta={pregunta} />
            ))}
        </section>
    )
}
