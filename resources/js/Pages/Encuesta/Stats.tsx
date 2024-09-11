import AppLayout from "@/Layouts/AppLayout";
import Encuesta from "@/Models/Encuesta";
import React from "react";

interface Props {
    encuesta: Encuesta
}

export default function Stats({ encuesta }: Props) {

    console.log(encuesta)

    return (
        <AppLayout title="Estadisticas">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className='text-white text-2xl uppercase mb-4 text-center'>
                        Estadísticas de la Encuesta
                    </h1>



                    <div className="p-2 bg-white opacity-90">
                        <p className="text-black opacity-90 mb-4 text-center">{encuesta.title}</p>

                        <table className="table-auto border-collapse border border-slate-500 w-full">
                            <thead>
                                <tr>
                                    <th className="border border-slate-600">Preguntas</th>
                                    <th className="border border-slate-600">
                                        <table className="w-full">
                                            <tbody>
                                                <tr>
                                                    <td className="text-left px-2">Respuestas</td>
                                                    <td className="text-right px-2" title="Respuestas por participantes">R/P</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="border-collapse">
                                {encuesta.preguntas?.map(pregunta => {
                                    let respT = 0;
                                    return (
                                        <tr>
                                            <td className="border border-slate-700 px-2">{pregunta.text}</td>
                                            <td className="border border-slate-700 border-collapse">
                                                <table className="w-full border-collapse">
                                                    <tbody>
                                                        {pregunta.respuestas?.map(respuesta => {
                                                            if(respuesta.users) {
                                                                respT += respuesta.users?.length
                                                            }

                                                            return (
                                                                <tr>
                                                                    <td className="border px-2">{respuesta.text}</td>
                                                                    <td className="border text-center min-w-10">{respuesta.users?.length}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                        <tr>
                                                            <td className="border font-bold px-2">Total</td>
                                                            <td className="border font-bold text-center w-10">{ respT }</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </AppLayout>
    )
}
