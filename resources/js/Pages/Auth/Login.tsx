import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

interface Props {
  canResetPassword: boolean;
  status: string;
}

export default function Login({ canResetPassword, status }: Props) {
  const route = useRoute();
  const form = useForm({
    email: '',
    password: '',
    remember: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('login'), {
      onFinish: () => form.reset('password'),
    });
  }

  return (
    <section className='auth'>
        <div className="box">
            <form onSubmit={onSubmit}>
                <h2>Login</h2>

                <div className='inputBx'>
                    <span className={form.errors.email ? 'error': ''}></span>
                    <input type="text"
                        value={form.data.email}
                        onChange={e => form.setData('email', e.currentTarget.value)}
                        required
                        placeholder='Username'
                        autoFocus
                    />
                </div>

                <div className='inputBx'>
                    <span className={form.errors.password ? 'error': ''}></span>
                    <input
                        type="password"
                        placeholder='Password'
                        onChange={e => form.setData('password', e.currentTarget.value)}
                        required
                        autoComplete='current-password'
                    />
                </div>

                <div className='inputBx'>
                    <input type="submit" value="Entrar"/>
                </div>

                <div className="group">
                    <a href="#">Olvide la clave</a>
                    <a href="#">Registrar me</a>
                </div>
            </form>
        </div>
    </section>
  );
}
