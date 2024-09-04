import Respuesta from "@/Models/Respuesta"
import TipoPregunta from "@/Models/TipoPregunta"
import { createContext } from "react"

const EncuestaContext = createContext<{
    tiposDePreguntas: TipoPregunta[],
    setSetTiposDePreguntas: (respuesta: Respuesta) => void
}>({
    tiposDePreguntas: [],
    setSetTiposDePreguntas: () => { }
})

export default EncuestaContext
