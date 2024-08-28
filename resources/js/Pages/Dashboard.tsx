import React from 'react';
import { Link, useForm, Head } from '@inertiajs/react';
import Welcome from '@/Components/Welcome';
import AppLayout from '@/Layouts/AppLayout';
import Question from '@/Components/icons/Question';
import Users from '@/Components/icons/Users';
import Ligth from '@/Components/icons/Light';
import useRoute from '@/Hooks/useRoute';

interface Encuesta {
    title: string;
    description: string;
    active: boolean;
}

export default function Dashboard() {
    const encuestas: Encuesta[] = [
        { active: true, description: 'Descripcion de la encuesta Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quidem excepturi laborum, tempore aliquam ut quisquam maxime fuga! Doloremque quo error vel minus illo consectetur consequuntur eligendi magnam, eveniet ex?', title: 'Titulo de la encuesta' },
        { active: false, description: 'Descripcion de la encuesta Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quidem excepturi laborum, tempore aliquam ut quisquam maxime fuga! Doloremque quo error vel minus illo consectetur consequuntur eligendi magnam, eveniet ex?', title: 'Titulo de la encuesta' },
        { active: true, description: 'Descripcion de la encuesta Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quidem excepturi laborum, tempore aliquam ut quisquam maxime fuga! Doloremque quo error vel minus illo consectetur consequuntur eligendi magnam, eveniet ex?', title: 'Titulo de la encuesta' },
        { active: true, description: 'Descripcion de la encuesta Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quidem excepturi laborum, tempore aliquam ut quisquam maxime fuga! Doloremque quo error vel minus illo consectetur consequuntur eligendi magnam, eveniet ex?', title: 'Titulo de la encuesta' },
        { active: false, description: 'Descripcion de la encuesta Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quidem excepturi laborum, tempore aliquam ut quisquam maxime fuga! Doloremque quo error vel minus illo consectetur consequuntur eligendi magnam, eveniet ex?', title: 'Titulo de la encuesta' },
        { active: true, description: 'Descripcion de la encuesta Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quidem excepturi laborum, tempore aliquam ut quisquam maxime fuga! Doloremque quo error vel minus illo consectetur consequuntur eligendi magnam, eveniet ex?', title: 'Titulo de la encuesta' },
        { active: true, description: 'Descripcion de la encuesta Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quidem excepturi laborum, tempore aliquam ut quisquam maxime fuga! Doloremque quo error vel minus illo consectetur consequuntur eligendi magnam, eveniet ex?', title: 'Titulo de la encuesta' },
        { active: false, description: 'Descripcion de la encuesta Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quidem excepturi laborum, tempore aliquam ut quisquam maxime fuga! Doloremque quo error vel minus illo consectetur consequuntur eligendi magnam, eveniet ex?', title: 'Titulo de la encuesta' },
        { active: true, description: 'Descripcion de la encuesta Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quidem excepturi laborum, tempore aliquam ut quisquam maxime fuga! Doloremque quo error vel minus illo consectetur consequuntur eligendi magnam, eveniet ex?', title: 'Titulo de la encuesta' },
        { active: false, description: 'Descripcion de la encuesta Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quidem excepturi laborum, tempore aliquam ut quisquam maxime fuga! Doloremque quo error vel minus illo consectetur consequuntur eligendi magnam, eveniet ex?', title: 'Titulo de la encuesta' },
        { active: true, description: 'Descripcion de la encuesta Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quidem excepturi laborum, tempore aliquam ut quisquam maxime fuga! Doloremque quo error vel minus illo consectetur consequuntur eligendi magnam, eveniet ex?', title: 'Titulo de la encuesta' }
    ]
    const form = useForm()
    const route = useRoute();



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
                        {encuestas.map(encuesta => (
                            <article className='encuesta-item bg-gray-500 text-white shadow-xl hover:shadow-red-500 hover:scale-105 transition'>
                                <header className='p-3'>
                                    {encuesta.title}
                                </header>
                                <div className='p-3'>{encuesta.description}</div>
                                <footer className={`flex justify-between p-3 ${encuesta.active ? 'active': ''}`}>
                                    <div className='flex flex-row gap-3'>
                                        <span className='flex items-center'><Ligth title='Activa' />: no</span>
                                        <span className='flex items-center'><Question title='Preguntas' />: <i>85</i></span>
                                        <span className='flex items-center'><Users title='Participantes' />: 56</span>
                                    </div>
                                    <div className='flex flex-row gap-3'>
                                        <span><b>Desde:</b> <i>0/09/2344</i></span>
                                        <span><b>Hasta:</b> <i>0/09/2344</i></span>
                                    </div>
                                </footer>
                            </article>
                        ))}
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
