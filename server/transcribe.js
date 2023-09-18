import { pipeline } from "@xenova/transformers"

import {transcriptionExample} from "./utils/transcription.js"

export async function transcribe(audio){
  try { // Tudo que colocamos aqui ele tenta executar
    //return transcriptionExample

    console.log("Realizando a transcrição...")
    //Definindo o modelo IA que será utilizado
    const transcribe = await pipeline("automatic-speech-recognition", "Xenova/whisper-small")

    // Utilizando o modelo IA definido anteriomente
    const transcription = await transcribe(audio, {
      chunk_lenght_s: 30,
      stride_length_s: 5,
      languages: "portuguese",
      task: "transcribe",
    })

    console.log("Transcrição finalizada com sucesso!")
    return transcription?.text.replace("[Música]", "")
  } catch (error) { // Se der algum erro ele captura neste bloco e devolve para quem chamou a função
    throw new Error(error)
  }
}