const button = document.querySelector("button");
const text = document.querySelector("textarea");

const recognition = createRecognition();
let listening = false;

button.addEventListener("click", (e) => {
  console.log("ASD");
  if (!recognition) return;
  listening ? recognition.stop() : recognition.start();

  button.innerHTML = listening ? "Aperte para falar" : "Parar de escutar";
  button.classList.toggle("bg-purple-200");
  button.classList.toggle("text-red-500");
});

function createRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition =
    SpeechRecognition !== undefined ? new SpeechRecognition() : null;

  if (!recognition) {
    text.innerHTML = "Navegador não compatível, utilize o Google Chrome";
    return null;
  }

  recognition.lang = "pt_BR";
  recognition.onstart = () => (listening = true);
  recognition.onend = () => (listening = false);
  recognition.onerror = (e) => {
    console.log("error", e);
    text.innerHTML = "Erro, verifique se seu microfone está ativo";

    return null;
  };
  recognition.onresult = (e) => (text.innerHTML = e.results[0][0].transcript);

  return recognition;
}
