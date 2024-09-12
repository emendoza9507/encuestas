import { User } from "@/types";
import React from "react";
import EditView from "./EditView";
import DeleteView from "./DeleteView";
import UserIcon from "@/Components/icons/User";

interface Props {
    user: User
}

export default function UserView({ user }: Props) {
    return (
        <article className="flex justify-between mb-4 border-b">
            <div className="text-gray-300 flex gap-1 items-center group py-2 ">
                <UserIcon className="size-10"/>
                <div className="flex flex-col ">
                    <span>{user.name}</span>
                    <small className=" italic transition-all opacity-60">{user.email}</small>
                </div>
            </div>
            <div className="flex items-center">
                <EditView usuario={user}/>
                <DeleteView usuario={user}/>
            </div>
        </article>
    )
}
