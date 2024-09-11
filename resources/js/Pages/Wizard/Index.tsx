import AppLayout from "@/Layouts/AppLayout";
import Encuesta from "@/Models/Encuesta";
import Pregunta from "@/Models/Pregunta";
import { Auth } from "@/types";
import React, { useEffect, useState } from "react";
import PreguntaView from "./partials/PreguntaView";
import Swal from "sweetalert2";
import { router } from "@inertiajs/core";
import ProgressBar from "@/Components/ProgressBar";

interface Props {
    auth: Auth
    encuesta: Encuesta & {
        preguntas: Pregunta[]
    }
}

export default function Index({ encuesta }: Props) {
    const [state, setState] = useState({index: 0, pregunta: encuesta.preguntas[0]})
    const [progresValue, setProgressValue] = useState(0);
    const isLast = () => encuesta.preguntas.length === state.index + 1;
    const isFirst = () => state.index === 0;

    const getProgressValue = (i: number) => {
        return (i) * 100 / encuesta.preguntas.length
    }

    const nextQuestion = () => {
        if (!isLast()) {
            setState((prevState) => {
                let nextIndex = prevState.index + 1
                let pregunta = encuesta.preguntas[nextIndex]
                setProgressValue(getProgressValue(nextIndex))
                return { index: nextIndex, pregunta: pregunta }
            })


        } else {
            Swal.fire({
                title: "Encuesta finalizada",
                text: 'Ha finalizado la encuesta con exito.',
                icon: 'success',
                showClass: {
                    popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                    popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
            }).then(() => {
                router.visit('/')
            });
        }


    }

    const backQuestion = () => {
        !isFirst() && setState((prevState) => {
            let nextIndex = prevState.index - 1
            let pregunta = encuesta.preguntas[nextIndex];
            setProgressValue(getProgressValue(nextIndex))
            return { index: nextIndex, pregunta: pregunta }
        })
    }


    return (
        <AppLayout title="Responder Encuesta">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className='text-white text-2xl uppercase mb-4 text-center md:text-left'>
                        {encuesta.title}
                    </h1>

                    <ProgressBar value={progresValue}/>

                    <span style={{fontSize: '0.63rem'}} className="text-gray-200 text-xs font-bold uppercase block mb-4">Pregunta #{state.index + 1} / {encuesta.preguntas.length}</span>

                    <PreguntaView isFirst={isFirst()} isLast={isLast()} onBack={backQuestion} onSubmited={nextQuestion} pregunta={state.pregunta} />
                </div>
            </div>
        </AppLayout>
    )
}
