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
    const [pregunta, setPregunta] = useState<Pregunta>(encuesta.preguntas[0]);
    const [index, setIndex] = useState(0);
    const [progresValue, setProgressValue] = useState(0);
    const isLast = () => encuesta.preguntas.length == index + 1;
    const isFirst = () => index == 0;

    const getProgressValue = () => {
        return (index + 1) * 100 / encuesta.preguntas.length
    }

    const nextQuestion = () => {
        if (!isLast()) {
            setIndex((prevIndex) => {
                setPregunta(() => {
                    return encuesta.preguntas[index + 1]
                })
                return prevIndex + 1
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

        setProgressValue(getProgressValue())
    }

    const backQuestion = () => {
        !isFirst && setIndex((prevIndex) => {
            setPregunta(encuesta.preguntas[prevIndex - 1])
            return index - 1
        })

        setProgressValue(getProgressValue())
    }


    return (
        <AppLayout title="Responder Encuesta">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className='text-white text-2xl uppercase mb-4 text-center md:text-left'>
                        {encuesta.title}
                    </h1>

                    <ProgressBar value={progresValue}/>

                    <span className="text-gray-200 text-sm font-bold uppercase block mb-4">Pregunta #{index + 1} / {encuesta.preguntas.length}</span>

                    <PreguntaView isFirst={isFirst()} isLast={isLast()} onBack={backQuestion} onSubmited={nextQuestion} pregunta={pregunta} />
                </div>
            </div>
        </AppLayout>
    )
}
