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
const auth = getAuth(); //configura o firebase authentication
const db = getFirestore(); //configura o firestore

//monitora o estado de autenticação do usuário
onAuthStateChanged(auth, (user) => {
    //busca de id do usuário autenticado do usuário
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    //se o id estiver no localStorage, tenta obter os dados do firestore
    if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId); //referência ao documento do usuário no firestore

        getDoc(docRef) //busca o documento
        .then((docSnap) => {
            //se o documento existir, exibe os dados na interface
            if (docSnap.exists()) {
                const userData = docSNap.data();
                document.getElementById('loggedUserName').innerText = userData.firstName;
                document.getElementById('loggedUserEmail').innerText = userData.email;
                document.getElementById('loggedUserLName').innerText = userData.lastName;
            } else {
                console.log("ID não econtrado no documento");
            }
        })
        .catch((error) => {
            console.log("documento não encontrado");
        });
    } else {
        console.log("ID do usuário não encontrado no localStorage");
    }
});

//lógica de logout
const logoutButton = doc.getElementById('logout');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId'); //remove o ID do LocalStorage
    signOut(auth) //realiza logout
    .then(() => {
        window.location.href = 'index.html'; //redireciona a página de login
    })
    .catch((error) => {
        console.error('Error Signing out:', error);
    });
});