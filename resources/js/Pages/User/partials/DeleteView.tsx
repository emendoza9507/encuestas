import Trash from "@/Components/icons/Trash";
import { User } from "@/types";
import { router } from "@inertiajs/core";
import React from "react";
import Swal from "sweetalert2";
import route from "ziggy-js";

interface Props {
    usuario: User
}

export default function DeleteView({usuario}: Props) {

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        Swal.fire({
            title: "Esta seguro?",
            text: `Eliminará el usuario, ${usuario.name}`,
            icon: "question",
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo!"
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('usuario.destroy', { usuario: usuario.id }), {
                    onSuccess: (res) => {

                    }
                })
            }
        })
    }

    return (
        <button className="text-red-400 hover:scale-125 transition-all" onClick={handleClick}>
            <Trash />
        </button>
    )
}
