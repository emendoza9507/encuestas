import { User } from "@/types";
import React from "react";
import EditView from "./EditView";
import DeleteView from "./DeleteView";

interface Props {
    user: User
}

export default function UserView({ user }: Props) {
    return (
        <article className="flex justify-between mb-4 border-b">
            <div className="text-gray-300 flex flex-col group ">
                <span>{user.name}</span>
                <small className="group-hover:text-sm italic transition-all opacity-60">{user.email}</small>
            </div>
            <div className="flex items-center">
                <EditView usuario={user}/>
                <DeleteView usuario={user}/>
            </div>
        </article>
    )
}
