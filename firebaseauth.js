import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDVjLXgAMoFWj4m4OBPuf0Bv_rN2t4-6FQ",
    authDomain: "auth-de6d7.firebaseapp.com",
    projectId: "auth-de6d7",
    storageBucket: "auth-de6d7.firebasestorage.app",
    messagingSenderId: "739004305886",
    appId: "1:739004305886:web:095eda4541796b8dbb4d4f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Função para exibir mensagens
function showMessage(message, divId){
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function(){
        messageDiv.style.opacity = 0;
    }, 5000);
}

// CADASTRO SIMPLIFICADO (SEM FIRESTORE)
document.getElementById('submitSignUp').addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        showMessage('Conta criada com sucesso! Redirecionando...', 'signUpMessage');
        const user = userCredential.user;
        
        // Salva apenas o ID no localStorage
        localStorage.setItem('loggedInUserId', user.uid);
        
        setTimeout(() => {
            window.location.href = 'homepage.html';
        }, 2000);
    })
    .catch((error) => {
        if(error.code == 'auth/email-already-in-use') {
            showMessage('Email já está em uso', 'signUpMessage');
        } else {
            showMessage('Erro: ' + error.message, 'signUpMessage');
        }
    });
});

// LOGIN SIMPLIFICADO
document.getElementById('submitSignIn').addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        showMessage('Login realizado! Redirecionando...', 'signInMessage');
        const user = userCredential.user;
        
        localStorage.setItem('loggedInUserId', user.uid);
        
        setTimeout(() => {
            window.location.href = 'homepage.html';
        }, 1000);
    })
    .catch((error) => {
        showMessage('Email ou senha incorretos', 'signInMessage');
    });
});

// LOGIN COM GOOGLE (SIMPLIFICADO)
function signInWithGoogle() {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
        const user = result.user;
        showMessage('Login com Google realizado!', 'signInMessage');
        
        localStorage.setItem('loggedInUserId', user.uid);
        
        setTimeout(() => {
            window.location.href = 'homepage.html';
        }, 1000);
    })
    .catch((error) => {
        showMessage('Erro no login com Google', 'signInMessage');
    });
}

// Adiciona eventos aos botões do Google
document.getElementById('googleSignUp').addEventListener('click', signInWithGoogle);
document.getElementById('googleSignIn').addEventListener('click', signInWithGoogle);