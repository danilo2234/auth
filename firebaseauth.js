//importa as funções necessárias do firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {getAuth, GoogleAuthProvider, signInWithPopUp, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFireStore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

//configurações do firebase
const firebaseconfig = {
    apiKey: "AIzaSyDVjLXgAMoFWj4m4OBPuf0Bv_rN2t4-6FQ",
  authDomain: "auth-de6d7.firebaseapp.com",
  projectId: "auth-de6d7",
  storageBucket: "auth-de6d7.firebasestorage.app",
  messagingSenderId: "739004305886",
  appId: "1:739004305886:web:095eda4541796b8dbb4d4f"
};

//Inicializa o Firebase
const app = initializeApp(firebaseConfig);

//Função para exibir mensagens temporárias na interface
function showMessage(message, divId){
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function(){
        messageDiv.style.opacity = 0;
    }, 5000); //A mensagem desaparece após 5 segundos
}

//lógica de cadastro de novos usuários
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault(); //previneo comportamento padrão do botão

    //captura os dados do formulário de cadastro
    const email = document. getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    const auth = getAuth(); //configura o serviço de autenticação
    const db = getFirestore(); //conecta ao firestore

    //cria uma conta com e-mail e senha
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user; //usuario autenticado
        const userData = { email, firstName, lastName }; //dados do usuário para salvar

        showMessage('Conta criada com sucesso', 'signUpMessage');

        //salva os dados do usuário do firestore
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(() => {
            window.location.href = 'index.html'; //redireciona para a página de login após cadastro
        })
        .catch((error) => {
            console.error("Error writing document", error);
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        if(errorCode == 'auth/email-already-in-use') {
            showMessage('Endereço de email já existe', 'signUpMessage');
        } else {
            showMessage('não é possível criar usuário', 'signUpMessage');
        }
    });
});

//lógica de login de usuários existentes
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault(); //previne o comportamento padrão do botão

    //captura os dados do formulário de login
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth(); //configura o serviço de autenticação

    //realiza o login com e-mail e senha
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        showMessage('usuário logado com sucesso', 'signInMessage'); //exibe mensagem de sucesso
        const user = userCredential.user;

        //salva o ID do usuário no localStorage
        localStorage.setItem('loggedInUserId', user.uid);

        window.location.href = 'homepage.html'; //redireciona para a página inicial
    })
    .catch((error) => {
        const errorCOde = error.code;
        if (errorCode === 'auth/invalid-credential') {
            showMessage('Email ou Senha Incorreta', signInMessage);
        } else {
            showMessage('Essa conta não existe', 'signInMessage');
        }
    });
});
