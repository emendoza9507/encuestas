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
            <form action="">
                <h2>Login</h2>

                <div className='inputBx'>
                    <span></span>
                    <input type="text" placeholder='Username'/>
                </div>

                <div className='inputBx'>
                    <span></span>
                    <input type="password" placeholder='Password'/>
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
