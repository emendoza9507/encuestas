import Respuesta from "@/Models/Respuesta"
import { createContext } from "react"

const RespuestaUserContext = createContext<{
    respuestaMarcada: Respuesta | undefined,
    setRespuestaMarcada: (respuesta: Respuesta) => void
}>({
    respuestaMarcada: undefined,
    setRespuestaMarcada: () => { }
})

export default RespuestaUserContext
