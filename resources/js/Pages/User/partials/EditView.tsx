import Edit from "@/Components/icons/Edit";
import { User } from "@/types";
import { Link } from "@inertiajs/react";
import React from "react";
import route from "ziggy-js";

interface Props {
    usuario: User
}

export default function EditView({ usuario }: Props) {
    return (
        <Link href={route("usuario.edit", {usuario: usuario.id})} className="text-yellow-500 hover:scale-125 transition-all">
            <Edit />
        </Link>
    )
}
