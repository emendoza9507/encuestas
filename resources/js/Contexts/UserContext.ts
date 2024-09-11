import { Auth, User } from "@/types";
import { createContext } from "react";

interface Props {
    auth: { user: User | null, permissions: {[key: string]: any} }
    can: string[],
    roles: string[],
    hasPermissions: (permision: string[]) => boolean,
    hasRoles: (role: string[]) => boolean
}

const UserContext = createContext<Props>({
    auth: { user: null, permissions: {} },
    can: [],
    roles: [],
    hasPermissions: () => false,
    hasRoles: () => false
})

export default UserContext;
