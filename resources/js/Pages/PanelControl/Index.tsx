import AppLayout from "@/Layouts/AppLayout";
import React, { useEffect, useState } from "react";
import Card from "./partials/Card";
import Encuesta from "@/Models/Encuesta";
import RespuestaUser from "@/Models/RespuestaUser";
import { PaginationProps } from "@/Components/Pagination";
import { Link } from "@inertiajs/react";
import User from "@/Models/User";
import route from "ziggy-js";
import Users from "@/Components/icons/Users";
import Cog from "@/Components/icons/Cog";

interface Props {
    encuestas: PaginationProps<Encuesta>
    users: PaginationProps<User>,
    participaciones: RespuestaUser[]
}

export default function Inde({ encuestas, users, participaciones }: Props) {

    useEffect(() => {

    }, [])

    return (
        <AppLayout title="Panel de Control">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className='text-white text-2xl uppercase mb-4 text-center'>
                        Panel de Control
                    </h1>

                    <hr className="mb-4" />

                    <div className="flex justify-between gap-4 mb-4">
                        <Card className="bg-transparent border" title="Encuestas" body={encuestas.total.toString()} />
                        <Card className="bg-transparent border" title="Usuarios" body={users.total.toString()} />
                        <Card className="bg-transparent border" title="Participaciones" body={participaciones.length.toString()} />
                    </div>

                    <hr className="mb-10" />

                    <div className="mb-10">
                        <h3 className="text-white font-bold uppercase  border inline m-0 py-1 px-2">Encuestas</h3>

                        <table className="w-full border-collapse px-2">
                            <thead>
                                <tr>
                                    <td className="uppercase px-2 border font-bold text-white">Titulo</td>
                                    <td className="uppercase px-2 border font-bold text-white text-center">Preguntas</td>
                                    <td className="uppercase px-2 border font-bold text-white text-center">INTERACIONES</td>
                                </tr>
                            </thead>
                            <tbody className="text-op">
                                {encuestas.data.map(encuesta => (
                                    <tr key={encuesta.id}>
                                        <td className="text-left px-2 border text-white opacity-75">{encuesta.title}</td>
                                        <td className="text-center px-2 border text-white opacity-75">{encuesta.preguntas?.length}</td>
                                        <td className="text-center px-2 border text-white opacity-75">{encuesta.participantes?.length}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={2} className="border border-t-0 px-2 py-1.5 relative  text-center text-white font-bold">{encuestas.from} - {encuestas.to} / {encuestas.total}</td>
                                    <td  className="border text-center text-white text-xl font-bold ">
                                        <div className="flex gap-2 justify-around">
                                            <Link className="" href={encuestas.prev_page_url}>&laquo;</Link>
                                            <Link className="" href={encuestas.next_page_url}>&raquo;</Link>
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="">
                        <h3 className="text-white font-bold uppercase  border inline-block m-0 py-1 px-2">
                            <Link href={route('usuario.index')} className="flex gap-1">Usuarios <Cog/></Link>
                        </h3>

                        <table className="w-full border-collapse px-2">
                            <thead>
                                <tr>
                                    <td className="uppercase px-2 border font-bold text-white">Nombre</td>
                                    <td className="uppercase px-2 border font-bold text-white">correo</td>
                                    <td className="uppercase px-2 border font-bold text-white">Permisos</td>
                                </tr>
                            </thead>
                            <tbody className="text-op">
                                {users.data.map(user => (
                                    <tr key={user.id}>
                                        <td className="text-left px-2 border text-white opacity-75">
                                            <Link href={route('usuario.edit', { usuario: user.id })}>
                                                {user.name}
                                            </Link>
                                        </td>
                                        <td className="text-left px-2 border text-white opacity-75">{user.email}</td>
                                        <td className="text-left px-2 border text-white opacity-75">{user.roles?.map(r => r.name).join(',')}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={2} className="border border-t-0 px-2 py-1.5 relative  text-center text-white font-bold">{users.from} - {users.to} / {users.total}</td>
                                    <td  className="border text-center text-white text-xl font-bold ">
                                        <div className="flex gap-2 justify-around">
                                            <Link className="" href={users.prev_page_url}>&laquo;</Link>
                                            <Link className="" href={users.next_page_url}>&raquo;</Link>
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
