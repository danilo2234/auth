//importa as funções necessárias do firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup,
    signOut, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { 
    getFirestore,
    setDoc, 
    doc 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDVjLXgAMoFWj4m4OBPuf0Bv_rN2t4-6FQ",
    authDomain: "auth-de6d7.firebaseapp.com",
    projectId: "auth-de6d7",
    storageBucket: "auth-de6d7.firebasestorage.app",
    messagingSenderId: "739004305886",
    appId: "1:739004305886:web:095eda4541796b8dbb4d4f"
};

//Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

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

// FUNÇÃO PARA LOGIN COM GOOGLE
function signInWithGoogle() {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        
        // The signed-in user info.
        const user = result.user;
        
        // Salva os dados do usuário no Firestore
        const userData = {
            email: user.email,
            firstName: user.displayName ? user.displayName.split(' ')[0] : '',
            lastName: user.displayName ? user.displayName.split(' ').slice(1).join(' ') : '',
            photoURL: user.photoURL,
            provider: 'google'
        };

        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData, { merge: true }) // Usa merge para não sobrescrever dados existentes
        .then(() => {
            showMessage('Login com Google realizado com sucesso!', 'signInMessage');
            
            // Salva o ID do usuário no localStorage
            localStorage.setItem('loggedInUserId', user.uid);
            
            // Redireciona para a homepage após 1 segundo
            setTimeout(() => {
                window.location.href = 'homepage.html';
            }, 1000);
        })
        .catch((error) => {
            console.error("Error writing document", error);
            showMessage('Erro ao salvar dados do usuário', 'signInMessage');
        });
    })
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro no login com Google:', error);
        
        if (errorCode === 'auth/popup-closed-by-user') {
            showMessage('Login com Google cancelado', 'signInMessage');
        } else {
            showMessage('Erro ao fazer login com Google: ' + errorMessage, 'signInMessage');
        }
    });
}

// Adiciona event listeners para os botões do Google
document.addEventListener('DOMContentLoaded', function() {
    // Botão do Google na tela de Sign Up
    const googleSignUpBtn = document.getElementById('googleSignUp');
    if (googleSignUpBtn) {
        googleSignUpBtn.addEventListener('click', signInWithGoogle);
    }
    
    // Botão do Google na tela de Sign In
    const googleSignInBtn = document.getElementById('googleSignIn');
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', signInWithGoogle);
    }
});

//lógica de cadastro de novos usuários
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault(); //previne o comportamento padrão do botão

    //captura os dados do formulário de cadastro
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    const auth = getAuth(); //configura o serviço de autenticação
    const db = getFirestore(); //conecta ao firestore

    //cria uma conta com e-mail e senha
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user; //usuario autenticado
        const userData = { 
            email, 
            firstName, 
            lastName,
            provider: 'email' 
        }; //dados do usuário para salvar

        showMessage('Conta criada com sucesso', 'signUpMessage');

        //salva os dados do usuário do firestore
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(() => {
            // Salva o ID do usuário no localStorage
            localStorage.setItem('loggedInUserId', user.uid);
            
            // Redireciona para a homepage após 2 segundos
            setTimeout(() => {
                window.location.href = 'homepage.html';
            }, 2000);
        })
        .catch((error) => {
            console.error("Error writing document", error);
            showMessage('Erro ao salvar dados do usuário', 'signUpMessage');
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        if(errorCode == 'auth/email-already-in-use') {
            showMessage('Endereço de email já existe', 'signUpMessage');
        } else if (errorCode == 'auth/weak-password') {
            showMessage('Senha muito fraca. Use pelo menos 6 caracteres', 'signUpMessage');
        } else {
            showMessage('Não é possível criar usuário: ' + error.message, 'signUpMessage');
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
        showMessage('Usuário logado com sucesso', 'signInMessage'); //exibe mensagem de sucesso
        const user = userCredential.user;

        //salva o ID do usuário no localStorage
        localStorage.setItem('loggedInUserId', user.uid);

        // Redireciona para a homepage após 1 segundo
        setTimeout(() => {
            window.location.href = 'homepage.html';
        }, 1000);
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
            showMessage('Email ou Senha Incorreta', 'signInMessage');
        } else if (errorCode === 'auth/user-not-found') {
            showMessage('Essa conta não existe', 'signInMessage');
        } else if (errorCode === 'auth/wrong-password') {
            showMessage('Senha incorreta', 'signInMessage');
        } else {
            showMessage('Erro no login: ' + error.message, 'signInMessage');
        }
    });
});

// Verifica se o usuário já está logado ao carregar a página
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Usuário está logado, redireciona para homepage
        window.location.href = 'homepage.html';
    }
});