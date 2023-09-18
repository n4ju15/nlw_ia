import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => { //Quando tornamos uma função async podemos utilizar o await, isso serve para que a função espere o servidor processar a requisição que front fez e devolver para o front a resposta
  event.preventDefault() //Previne o comportamento padrão de recarregar a página
  content.classList.add("placeholder")

  const videoURL = input.value //Pega o valor inserido no input

  // Função para verificar se a URL inserida é de um short
  if (!videoURL.includes("shorts")) {
    return (content.textContent = "Esse vídeo não parece ser um Short :(") //Usamos o return aqui pois, se a condição for atendida o resto da função não será executado
  }

  //Obtém o ID do vídeo
  const [_, params] = videoURL.split("/shorts/") //O split separa o link em duas posições conforme o parâmetro passado
  const [videoId] = params.split("?si")

  // Mostra no front-end que a transcrição irá começar
  content.textContent = "Obtendo a transcrição do áudio..."

  // Rota de requisição (GET) para fazer a transcrição do vídeo
  const transcription = await server.get("/summary/" + videoId) // O await indica que necessário esperar essa etapa esperar

   // Mostra no front-end que a transcrição está ocorrendo
  content.textContent = "Processando o resumo..."

  // Rota para enviar o resultado da transcrição
  const summary = await server.post("/summary", { 
    text: transcription.data.result,
  })

  //
  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
