import React, { PropsWithChildren, useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useForm, Head, usePage } from '@inertiajs/react';
import Welcome from '@/Components/Welcome';
import AppLayout from '@/Layouts/AppLayout';
import Question from '@/Components/icons/Question';
import Users from '@/Components/icons/Users';
import Ligth from '@/Components/icons/Light';
import useRoute from '@/Hooks/useRoute';
import Encuesta from '@/Models/Encuesta';
import { Auth, User } from '@/types';
import route from 'ziggy-js';
import Pagination, { PaginationProps } from '@/Components/Pagination';
import { Router, router } from '@inertiajs/core';

interface Props {
    auth: Auth
    encuestas: PaginationProps<Encuesta>
}

interface ItemProps {
    auth: Auth
    encuesta: Encuesta,
    delay: number
}

function EncuestaView({ encuesta, auth, delay }: ItemProps) {
    const [opacity, setOpacity] = useState(0);
    useEffect(() => {
        delay && setTimeout(() => {
            setOpacity(1)
        }, delay * 1000)
    }, [])

    return (
        <article style={{animationDelay: delay + 's', opacity: opacity}} className='encuesta-item flex flex-col justify-between  animate-fadeInUp bg-gray-500 text-white shadow-xl hover:shadow-red-500 hover:scale-105 transition'>
            <header className='p-3 font-bold'>
                <Link href={route('encuesta.show', {encuestum: encuesta.id})}>{encuesta.title}</Link>
            </header>
            <div className='p-3 text-gray-300'>
                <div>
                    <span className='text-white'><b className='bg-cyan-800 px-1 py-0.5'>Autor:</b> <i>{encuesta.creador?.name}</i></span>
                </div>
                {encuesta.description}
            </div>
            <footer className={`flex justify-between p-3 ${encuesta.active ? 'active' : ''}`}>
                <div className='flex flex-row gap-3'>
                    <span className='flex items-center text-green-300'><Ligth title='Activa' /></span>
                    <span className='flex items-center'><Question title='Preguntas' />: <i>{encuesta.preguntas?.length}</i></span>
                    <span className='flex items-center'><Users title='Participantes' />: {encuesta.participantes?.length}</span>
                </div>
            </footer>
        </article>
    )
}

export default function Dashboard({ encuestas, auth }: PropsWithChildren<Props>) {
    const form = useForm({
        query: ''
    });
    const route = useRoute();

    function handleSearch(e: React.FormEvent) {
        e.preventDefault()

        form.get('/');
    }

    return (
        <AppLayout
            title="Dashboard"
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className='flex flex-row items-center gap-4'>
                        <div className="inputBx !w-11/12">
                            <span></span>
                            <input type="search" onChange={({target}) => form.setData('query', target.value)} placeholder='Buscar por nombre de encuesta' />
                        </div>
                        <form onSubmit={handleSearch} className="inputBx ">
                            <input type="submit" value="Buscar" />
                        </form>
                    </div>

                    <section className="grid grid-col-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-4">
                        {encuestas.data.map((encuesta, index) => (
                            <EncuestaView key={encuesta.id} delay={index + 0.01} auth={auth} encuesta={encuesta}/>
                        ))}
                    </section>
                    <Pagination options={{...encuestas, name: 'encuestas'}}/>
                </div>
            </div>
        </AppLayout>
    );
}
