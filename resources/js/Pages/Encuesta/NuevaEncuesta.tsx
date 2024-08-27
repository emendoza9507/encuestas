import React from 'react';
import { Link, useForm, Head } from '@inertiajs/react';
import AppLayout from "@/Layouts/AppLayout";
import useRoute from '@/Hooks/useRoute';

export default function NuevaEncuesta() {
    const route = useRoute();
    const form = useForm({
        title: '',
        description: '',
        start_date: '',
        exp_date: '',
        active: true
    });

    function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        form.post(route('encuesta.store'), {
            onFinish: () => form.reset()
        })
    }

    return (
        <AppLayout title="Nueva Encuesta">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className='text-white text-2xl uppercase'>Crear nueva Encuesta</h1>

                    <form onSubmit={onSubmit} className='p-2 mt-4'>
                        <div className='inputBx !w-full'>
                            <span className={form.errors.title ? 'error' : ''}></span>
                            <input type="text" onChange={e => form.setData('title', e.currentTarget.value)} className='' placeholder='Titulo' />
                        </div>

                        <div className='inputBx !w-full'>
                            <span className={form.errors.description ? 'error' : ''}></span>
                            <textarea onChange={e => form.setData('description', e.currentTarget.value)} placeholder='Descripcion'></textarea>
                        </div>

                        <div className='flex gap-5'>
                            <div className='inputBx'>
                                <span className={form.errors.start_date ? 'error' : ''}></span>
                                <label htmlFor="">Desde:</label>
                                <input type="date" onChange={e => form.setData('start_date', e.currentTarget.value)} placeholder='Inicio' />
                            </div>
                            <div className='inputBx'>
                                <span className={form.errors.exp_date ? 'error' : ''}></span>
                                <label htmlFor="">Hasta:</label>
                                <input type="date" onChange={e => form.setData('exp_date', e.currentTarget.value)} placeholder='Fin' />
                            </div>
                            <div className='inputBx'>
                                <span className={form.errors.active ? 'error' : ''}></span>
                                <label htmlFor="">Estado</label>
                                <select name="" id="" onChange={e => form.setData('active', Boolean(e.currentTarget.value))}>
                                    <option value="true" className='text-black'>ACTIVO</option>
                                    <option value="false" className='text-black'>NO ACTIVO</option>
                                </select>
                            </div>
                        </div>



                        <div className='inputBx'>
                            <input type="submit" value="Crear" />
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}
