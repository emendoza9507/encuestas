import Pagination, { PaginationProps } from "@/Components/Pagination";
import AppLayout from "@/Layouts/AppLayout";
import { User } from "@/types";
import React from "react";
import UserView from "./partials/UserView";
import { Link } from "@inertiajs/react";
import route from "ziggy-js";
import PlusCircle from "@/Components/icons/PlusCircle";
import { router } from "@inertiajs/core";

interface Props {
    usuarios: PaginationProps<User>
}

export default function Index( { usuarios }: Props ) {
    return (
        <AppLayout title="Usuarios">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className='text-white text-2xl uppercase mb-4 text-center md:text-left'>
                        Gestion de Usuarios
                    </h1>

                    <button onClick={e=> router.visit(route('usuario.create'))} className="flex items-center mb-4 px-3 py-1 bg-teal-400 hover:bg-teal-500 transition-all">
                        <PlusCircle/> Crear
                    </button>

                    <section>
                        { usuarios.data.map((usuario) => (
                            <UserView key={usuario.id} user={usuario}/>
                        )) }
                    </section>

                    <Pagination options={{...usuarios, name: 'usuarios'}}/>
                </div>
            </div>
        </AppLayout>
    )
}
