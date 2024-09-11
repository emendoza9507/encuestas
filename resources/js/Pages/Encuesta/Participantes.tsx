import AppLayout from "@/Layouts/AppLayout";
import Encuesta from "@/Models/Encuesta";
import { router } from "@inertiajs/core";
import { usePage } from "@inertiajs/react";
import React from "react";
import route from "ziggy-js";

interface Props {
    encuesta: Encuesta
}

export default function Participantes({ encuesta }: Props) {

    let page = usePage();

    console.log(page.props)

    return (
        <AppLayout title="Participantes">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className='text-white text-2xl uppercase mb-4 text-center'>
                        {encuesta.title}
                    </h1>

                    <div className="p-2 bg-white opacity-90">
                        <p className="text-black opacity-90 mb-4 text-center uppercase font-bold">Participantes</p>

                        <table className="table-auto border-collapse border border-slate-500 w-full">
                            <thead>
                                <tr>
                                    <th className="border border-slate-600 text-left px-2">Nombre</th>
                                    <th className="border border-slate-600 text-left px-2">email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {encuesta.participantes?.map(participante => {
                                    return (
                                        <tr key={participante.id}>
                                            <td className="border border-slate-700 px-2">{participante.name}</td>
                                            <td className="border border-slate-700 px-2">{participante.email}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <table className="w-fit border border-t-0 border-slate-700 px-2">
                            <tbody >
                                <tr>
                                    <td className="text-right pl-2 font-bold"> Total:</td>
                                    <td className="w-4 px-2 font-bold">{encuesta.participantes?.length}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
