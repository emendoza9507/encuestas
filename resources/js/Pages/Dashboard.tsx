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
import SendSolid from '@/Components/icons/SendSolid';

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

    }, [])

    return (
        <article className='encuesta-item flex flex-col justify-between   bg-gray-500 text-white shadow-xl hover:shadow-red-500 hover:scale-105 transition'>
            <header className='p-3 font-bold'>
                <Link href={route('encuesta.show', {encuestum: encuesta.id})}>{encuesta.title}</Link>
            </header>
            {/* <div className='p-3 text-gray-300'>
                <div>
                    <span className='text-white'><b className='bg-cyan-800 px-1 py-0.5'>Autor:</b> <i>{encuesta.creador?.name}</i></span>
                </div>
            </div> */}
            <footer className={`flex justify-between p-3 ${encuesta.active ? 'active' : ''}`}>
                <div className='flex flex-row gap-3'>
                    <span className='flex items-center text-green-300'><Ligth title='Activa' /></span>
                    <span className='flex items-center'><Question title='Preguntas' />: <i>{encuesta.preguntas?.length}</i></span>
                    <span className='flex items-center'><Users title='Participantes' />: {encuesta.participantes?.length}</span>
                </div>
                <button onClick={() => router.visit(route('encuesta.responder', {encuesta: encuesta.id}))} className='flex gap-1 border-2 p-1 hover:scale-110 transition-all hover:border-red-500 group'>
                    <SendSolid className='group-hover:animate-bounce group-hover:text-red-400 '/> Responder
                </button>
            </footer>
        </article>
    )
}

export default function Dashboard({ encuestas, auth, ...props }: PropsWithChildren<Props>) {
    const [filterEncustas, setFilerEncuestas] = useState({...encuestas})
    const route = useRoute();

    const form = useForm({
        query: ''
    });

    function handleSearch(e: React.FormEvent) {
        e.preventDefault()

        form.get('/');
    }

    function handleFilterSearch(e: React.KeyboardEvent) {
        setFilerEncuestas({...encuestas, data: encuestas.data.filter(encuesta => encuesta.title.toLowerCase().includes(form.data.query.toLowerCase()))})
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
                            <input type="search" onKeyUp={handleFilterSearch} onChange={({target}) => form.setData('query', target.value)} placeholder='Buscar por nombre de encuesta' />
                        </div>
                        <form onSubmit={handleSearch} className="inputBx ">
                            <input type="submit" value="Buscar" />
                        </form>
                    </div>

                    <section className="grid grid-col-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-4">
                        {filterEncustas.data.map((encuesta, index) => (
                            <EncuestaView key={encuesta.id} delay={index + 0.01} auth={auth} encuesta={encuesta}/>
                        ))}
                    </section>
                    <Pagination options={{...encuestas, name: 'encuestas'}}/>
                </div>
            </div>
        </AppLayout>
    );
}
