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
    encuesta: Encuesta
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
        axios.get(route('api.pregunta.show', {preguntum: pregunta.id}))
        axios.get(route('api.pregunta.show', {preguntum: pregunta.id}))
        axios.get(route('api.pregunta.show', {preguntum: pregunta.id}))
        axios.get(route('api.pregunta.show', {preguntum: pregunta.id}))
        axios.get(route('api.pregunta.show', {preguntum: pregunta.id}))
        axios.get(route('api.pregunta.show', {preguntum: pregunta.id}))
    }, [])


    return (
        <article className='mb-4 bg-gray-600 text-white shadow-xl hover:shadow-red-500 hover:scale-105 transition'>
            <div className='p-3'>{pregunta.text}</div>
            <footer className={`flex gap-3 p-3 bg-gray-700`}>
                <Link href={route('pregunta.show', { preguntum: pregunta.id })}>
                    <FolderOpen/>
                </Link>
                <Link href='#'>
                    <Question/> : {respuestas.length}
                </Link>
            </footer>
        </article>
    )
}

export default function ListPreguntas({ encuesta }: Props) {
    return (
        <section>
            <div className='flex justify-between font-bold text-gray-300'>
                <h4 className='font-bold text-gray-300'>Preguntas de la encuesta:</h4>
                <span>{encuesta.preguntas?.length}</span>
            </div>
            <hr className='mb-4' />


            {encuesta.preguntas?.map((pregunta, index) => (
                <PreguntaItem index={index + 1} key={pregunta.id} pregunta={pregunta} />
            ))}
        </section>
    )
}
