import { User } from "@/types";
import Pregunta from "./Pregunta";

export default interface Respuesta {
    id: string,
    pregunta_id: string,
    text: string,
    pregunta: Pregunta,
    users?: User[]
}
