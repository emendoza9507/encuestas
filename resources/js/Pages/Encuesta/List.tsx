import React, { useEffect, useState } from "react";
import Ligth from "@/Components/icons/Light";
import Question from "@/Components/icons/Question";
import Trash from "@/Components/icons/Trash";
import Users from "@/Components/icons/Users";
import AppLayout from "@/Layouts/AppLayout";
import Encuesta from "@/Models/Encuesta";
import { Auth } from "@/types";
import { router } from "@inertiajs/core";
import { Link, useForm } from "@inertiajs/react";
import moment from "moment";
import Swal from "sweetalert2";
import route from "ziggy-js";
import Edit from "@/Components/icons/Edit";
import Pagination, { PaginationProps } from "@/Components/Pagination";

interface Props {
    auth: Auth,
    encuestas: PaginationProps<Encuesta>
    message: string,
    query: string
}

interface EncuestaViewProps {
    encuesta: Encuesta
}

function EncuestaView({ encuesta }: EncuestaViewProps) {
    function handleEliminarEncuesta() {
        Swal.fire({
            title: "Esta seguro?",
            text: "Eliminará la encuesta",
            icon: "question",
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminala!"
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('encuesta.destroy', { encuestum: encuesta.id }), {
                    onSuccess: (res) => {

                    }
                })
            }
        })

    }

    return (
        <article className='flex flex-col justify-between encuesta-item bg-gray-500 text-white shadow-xl hover:shadow-red-500 hover:scale-105 transition'>
            <header className='p-3 relative'>
                <Link href={route('encuesta.show', { encuestum: encuesta.id })}>{encuesta.title}</Link>

            </header>
            <div className='p-3'>{encuesta.description}</div>
            <footer className={`flex justify-between p-3 ${encuesta.active ? 'active' : ''}`}>
                <div className='flex flex-row gap-3'>
                    <span className='flex items-center text-green-300'><Ligth title='Activa' /></span>
                    <span className='flex items-center'><Question title='Preguntas' />: <i>{encuesta.preguntas?.length}</i></span>
                    <span className='flex items-center'><Users title='Participantes' />: {encuesta.participantes?.length}</span>
                </div>

                <div className="flex gap-2 right-3 top-3">
                    <button className="text-yellow-500 hover:scale-125 transition" onClick={() => router.visit(route('encuesta.edit', { encuestum: encuesta.id }))}><Edit /></button>
                    <button className="text-red-800 hover:scale-125 transition" onClick={handleEliminarEncuesta}><Trash /></button>
                </div>
            </footer>
        </article>
    )
}

export default function List({ encuestas, message, query }: Props) {
    const [filterEncustas, setFilerEncuestas] = useState({...encuestas})

    const form = useForm({
        query: query ?? ''
    })

    useEffect(() => {
        if (message) {
            Swal.fire({
                title: "Atención!",
                text: message,
                icon: "success"
            });
        }
    }, [message])

    function handleSearch(e: React.FormEvent) {
        e.preventDefault()

        form.get(route('encuesta.index'), {
            onSuccess() {

            }
        });
    }

    function handleFilterSearch(e: React.KeyboardEvent) {
        setFilerEncuestas({...encuestas, data: encuestas.data.filter(encuesta => encuesta.title.includes(form.data.query))})
    }

    return (
        <AppLayout title="Mis Encuestas">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className='text-white text-2xl uppercase mb-4 text-center md:text-left'>
                        Gestion de Encuestas
                    </h1>


                    <div className="flex flex-row items-center gap-4">
                        <div className="inputBx !w-full md:!w-56 md:!mx-1">
                            <span></span>
                            <input type="submit" onClick={() => router.visit(route('encuesta.create'))} value="Nueva encuesta" />
                        </div>
                        <div className="inputBx !w-11/12">
                            <span></span>
                            <input type="search" onKeyUp={handleFilterSearch} onChange={({ target }) => form.setData('query', target.value)} value={form.data.query} placeholder='Buscar por nombre de encuesta' />
                        </div>
                        <form onSubmit={handleSearch} className="inputBx ">
                            <input type="submit" value="Buscar" />
                        </form>
                    </div>

                    <section className="grid grid-col-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-4">
                        {filterEncustas.data.map((encuesta) => <EncuestaView key={encuesta.id} encuesta={encuesta} />)}
                    </section>

                    <Pagination options={{...encuestas, name: 'encuestas'}}/>
                </div>
            </div>
        </AppLayout>
    )
}
