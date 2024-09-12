import AppLayout from "@/Layouts/AppLayout";
import Role, { Permission } from "@/Models/Role";
import User from "@/Models/User";
import { Auth } from "@/types";
import { useForm } from "@inertiajs/react";
import React from "react";
import route from "ziggy-js";

interface Props {
    auth: Auth
    usuario: User & {
        roles: Role[],
        permissions: Permission[]
        password: string
    }
    roles: Role[]
    permissions: Permission[]
}

interface FormType {
    id: string
    name: string
    email: string
    password: string | null
    password_confirmation: string | null
    roles: string[]
    permissions: string[]
}

export default function Edit({ usuario, roles, permissions }: Props) {
    const form = useForm<FormType>({
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        password: null,
        password_confirmation: null,
        roles: usuario.roles.map(role => role.id),
        permissions: usuario.permissions.map(permission => permission.id)
    })

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        form.put(route('usuario.update', {usuario: usuario.id}))
    }

    const handleChecked = (prop: keyof FormType) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            let id: string = e.currentTarget.value
            if (e.target.checked) {
                form.setData(prop, [...form.data.roles, id])
            } else {
                form.setData(prop, form.data.roles.filter(role => role !== id));
            }
        }
    }

    return (
        <AppLayout title="Editar Usuario">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className='text-white text-2xl uppercase mb-6 text-center'>
                        Editar usuario
                    </h1>

                    <form onSubmit={onSubmit} className='p-2 mt-4'>
                        <header className="text-center mb-6">
                            <h3 className="subtitle text-white uppercase">
                                <span className="bg-gray-700 p-2 border-2">Datos del usuario</span>
                            </h3>
                        </header>

                        <div className='inputBx !w-full'>
                            <span className={form.errors.name ? 'error' : ''}></span>
                            <input type="text" value={form.data.name} onChange={e => form.setData('name', e.currentTarget.value)} className='' placeholder='Nombre' />
                            {form.errors.name && <p className="absolute -bottom-7 text-red-500">{form.errors.name}</p>}
                        </div>

                        <div className='inputBx !w-full'>
                            <span className={form.errors.email ? 'error' : ''}></span>
                            <input type="text" value={form.data.email} onChange={e => form.setData('email', e.currentTarget.value)} className='' placeholder='Correo' />
                            {form.errors.email && <p className="absolute -bottom-7 text-red-500">{form.errors.email}</p>}
                        </div>

                        <div className='inputBx !w-full'>
                            <span className={form.errors.password ? 'error' : ''}></span>
                            <input type="password" onChange={e => form.setData('password', e.currentTarget.value)} className='' placeholder='Ingrese la nueva clave' />
                            {form.errors.password && <p className="absolute -bottom-7 text-red-500">{form.errors.password}</p>}
                        </div>

                        <div className='inputBx !w-full'>
                            <span className={form.errors.password ? 'error' : ''}></span>
                            <input type="password" onChange={e => form.setData('password_confirmation', e.currentTarget.value)} className='' placeholder='Repite la clave anterior' />
                            {form.errors.password && <p className="absolute -bottom-7 text-red-500">{form.errors.password}</p>}
                        </div>

                        <section className="text-center mb-6">
                            <h3 className="subtitle text-white uppercase">
                                <span className="bg-gray-700 p-2 border-2">Roles y Permisos</span>
                            </h3>
                        </section>

                        <div className="flex gap-2 mb-4">
                            <div className="flex-1">
                                <h5 className="text-white mb-2 uppercase">Roles</h5>
                                <div className="flex gap-2 flex-wrap">
                                    {roles.map(role => (
                                        <label key={role.id} className="flex items-center gap-1">
                                            <input defaultChecked={form.data.roles.includes(role.id)} onChange={handleChecked('roles')} type="checkbox" value={role.id} name="role[]" /> <span className="text-white">{role.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1">
                                <h5 className="text-white mb-2 uppercase">Permisos</h5>
                                <div className="flex gap-2 flex-wrap">
                                    {permissions.map(permission => (
                                        <div key={permission.id} className="flex items-center gap-1">
                                            <input defaultChecked={form.data.permissions.includes(permission.id)} onChange={handleChecked('permissions')} type="checkbox" value={permission.id} name="permission[]" /> <span className="text-white">{permission.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='inputBx'>
                            <input type="submit" value="Guardar" />
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}
