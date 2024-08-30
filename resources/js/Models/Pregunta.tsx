import Encuesta from "./Encuesta"
import Respuesta from "./Respuesta"
import TipoPregunta from "./TipoPregunta"

export default interface Pregunta
{
    id: string,
    encuesta_id: string,
    tipo_pregunta_id: string,
    text: string
    encuesta?: Encuesta
    respuestas?: Respuesta[],
    tipoPregunta?: TipoPregunta
}
