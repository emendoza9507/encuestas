import Pagination, { PaginationProps } from "@/Components/Pagination";
import AppLayout from "@/Layouts/AppLayout";
import { User } from "@/types";
import React from "react";
import UserView from "./partials/UserView";

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
