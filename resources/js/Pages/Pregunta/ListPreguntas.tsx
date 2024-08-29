import FolderOpen from '@/Components/icons/FolderOpen';
import Encuesta from '@/Models/Encuesta';
import Pregunta from '@/Models/Pregunta';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import route from 'ziggy-js';

interface Props {
    encuesta: Encuesta
}

interface PreguntaItemProps {
    pregunta: Pregunta,
    index: number
}

function PreguntaItem({ pregunta, index }: PreguntaItemProps) {
    return (
        <article className='mb-4 bg-gray-500 text-white shadow-xl hover:shadow-red-500 hover:scale-105 transition'>
            <header className='px-3 py-2'>
                Pregunta #{index}
            </header>
            <div className='px-3'>{pregunta.text}</div>
            <footer className={`flex justify-between p-3`}>
                <Link href={route('pregunta.show', { preguntum: pregunta.id })}>
                    <FolderOpen/>
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
