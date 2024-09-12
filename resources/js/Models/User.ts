import Role, { Permission } from "./Role"

export default interface User {
    id: string,
    name: string,
    email: string,
    password?: string,
    password_confirmation?: string,
    terms?: false,
    roles?: Role[]
    permissions: Permission[]
}
