import Pregunta from "./Pregunta"

export default interface Encuesta
{
    id: string
    title: string,
    description: string,
    start_date: string,
    exp_date: string,
    active: string,
    created_by: number,
    preguntas?: Pregunta[]
}
