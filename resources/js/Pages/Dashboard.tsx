import React, { PropsWithChildren, useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useForm, Head } from '@inertiajs/react';
import Welcome from '@/Components/Welcome';
import AppLayout from '@/Layouts/AppLayout';
import Question from '@/Components/icons/Question';
import Users from '@/Components/icons/Users';
import Ligth from '@/Components/icons/Light';
import useRoute from '@/Hooks/useRoute';
import Encuesta from '@/Models/Encuesta';
import { Auth, User } from '@/types';
import route from 'ziggy-js';

interface Props {
    auth: Auth
    encuestas: Encuesta[]
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
        <article style={{animationDelay: delay + 's', opacity: opacity}} className='encuesta-item animate-fadeInUp bg-gray-500 text-white shadow-xl hover:shadow-red-500 hover:scale-105 transition'>
            <header className='p-3'>
                <Link href={route('encuesta.show', {encuestum: encuesta.id})}>{encuesta.title}</Link>
            </header>
            <div className='p-3'>{encuesta.description}</div>
            <footer className={`flex justify-between p-3 ${encuesta.active ? 'active' : ''}`}>
                <div className='flex flex-row gap-3'>
                    <span className='flex items-center text-green-300'><Ligth title='Activa' /></span>
                    <span className='flex items-center'><Question title='Preguntas' />: <i>{encuesta.preguntas?.length}</i></span>
                    <span className='flex items-center'><Users title='Participantes' />: {encuesta.participantes?.length}</span>
                </div>
                <div className='flex flex-row gap-3'>
                    <span><b>Por:</b> <i className={(encuesta.created_by == auth.user?.id ? 'underline' : '').concat(" cursor-pointer")}>{encuesta.creador?.name}</i></span>
                    <span><b>Desde:</b> <i>{moment(encuesta.start_date).format('DD/MM/YYYY')}</i></span>
                    <span><b>Hasta:</b> <i>{moment(encuesta.exp_date).format('DD/MM/YYYY')}</i></span>
                </div>
            </footer>
        </article>
    )
}

export default function Dashboard({ encuestas, auth }: PropsWithChildren<Props>) {
    const form = useForm()
    const route = useRoute();

    const [ecue, setEncuestas] = useState<Encuesta[]>([])

    return (
        <AppLayout
            title="Dashboard"
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className='flex flex-row items-center gap-4'>
                        <div className="inputBx !w-11/12">
                            <span></span>
                            <input type="search" placeholder='Buscar' />
                        </div>
                        <form action={route('encuesta.create')} className="inputBx ">
                            <input type="submit" value="Nueva Encuesta" />
                        </form>
                    </div>

                    <section className="">
                        {encuestas.map((encuesta, index) => (
                            <EncuestaView key={encuesta.id} delay={index + 0.2} auth={auth} encuesta={encuesta}/>
                        ))}
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
