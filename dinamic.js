 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-analytics.js";
  import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCwLQcN9hDWiEo57gLPa_xK8tuKkntHDtg",
    authDomain: "apimaya-3add7.firebaseapp.com",
    projectId: "apimaya-3add7",
    storageBucket: "apimaya-3add7.firebasestorage.app",
    messagingSenderId: "932162923673",
    appId: "1:932162923673:web:5ea17f950f8ebab8f19c08",
    measurementId: "G-VTSD17EJVJ"
  };

    /* Initialize Firebase */
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getFirestore(app); 
  
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => { 

        /* Previne que a página não recarregue*/
        e.preventDefault();
        const btn = document.getElementById("bt-form")
        btn.disabled = true;

        const nome = form.nome_pessoa.value.trim();
        const pergunta = form.pergunta_pessoa.value.trim();

        // Confere se algum dos dois campos está vazio ou só com espaços
        if (!nome || !pergunta) {
            alert("[SYSTEM]: Por favor, preencha seu nome e sua pergunta antes de enviar!");
            return; // Interrompe a função aqui e não envia nada para o Firebase
        }

        /* Tenta isso */
        try {
            /* Envia os dados do formulário para o banco de dados noSQL*/
            await addDoc(collection(db, "fila_maya"), {
            nome: form.nome_pessoa.value.trim(),
            pergunta: form.pergunta_pessoa.value.trim(),
            criado_em: serverTimestamp()
            });

            /* Reseta o formulário para nova pergunta*/
            form.reset();

            alert("[SYSTEM]: Sua pergunta foi enviada com sucesso.")
        }
        /* Se falhar aparece no console.log o erro */
        catch (err) {
            console.error("[SYSTEM]: Erro ao enviar:", err);
            alert("[SYSTEM]: Não foi possível enviar sua pergunta.");
        } 
        finally {
            btn.disabled = false;
        }
})

const audio = document.getElementById("musica-fundo");
const btnMusica = document.querySelector(".play_musica");
const iconeMusica = btnMusica.querySelector("img");

audio.volume = 1; // Volume ambiente (20%)
let tocando = false;

btnMusica.addEventListener("click", () => {
    if (tocando) {
        audio.pause();
        iconeMusica.src = "play.png";
    } else {
        audio.play();
        iconeMusica.src = "stop.png"; 
    }
    tocando = !tocando;
});