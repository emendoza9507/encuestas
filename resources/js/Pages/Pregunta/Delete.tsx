import Trash from "@/Components/icons/Trash";
import Pregunta from "@/Models/Pregunta";
import { router } from "@inertiajs/core";
import React from "react";
import Swal from "sweetalert2";
import route from "ziggy-js";

interface DeleteProps {
    pregunta: Pregunta
}

export default function Delete({ pregunta }: DeleteProps) {
    const handleClick = () => {
        Swal.fire({
            title: "Esta seguro?",
            text: "Eliminará la pregunta, las posibles respuestas y las interacciones de los usuarios",
            icon: "question",
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminala!"
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('pregunta.destroy', { preguntum: pregunta.id }), {
                    onSuccess: (res) => {

                    }
                })
            }
        })
    }

    return (
        <React.Fragment>
            <button className="text-red-400" onClick={handleClick}>
                <Trash />
            </button>
        </React.Fragment>
    )
}
