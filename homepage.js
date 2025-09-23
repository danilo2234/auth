import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getAuth, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDVjLXgAMoFWj4m4OBPuf0Bv_rN2t4-6FQ",
    authDomain: "auth-de6d7.firebaseapp.com",
    projectId: "auth-de6d7",
    storageBucket: "auth-de6d7.firebasestorage.app",
    messagingSenderId: "739004305886",
    appId: "1:739004305886:web:095eda4541796b8dbb4d4f"
};

// Apenas Auth - SEM Firestore
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Função para mostrar dados do usuário
function displayUserInfo(user) {
    console.log('📱 Mostrando dados do usuário:', user.email);
    
    // Elementos da página
    const emailElement = document.getElementById('loggedUserEmail');
    const firstNameElement = document.getElementById('loggedUserFName');
    const lastNameElement = document.getElementById('loggedUserLName');
    
    // Sempre mostra o email
    if (emailElement) {
        emailElement.textContent = user.email || 'Email não disponível';
    }
    
    // Para login com Google (tem displayName)
    if (user.displayName) {
        const names = user.displayName.split(' ');
        if (firstNameElement) firstNameElement.textContent = names[0] || 'Usuário';
        if (lastNameElement) lastNameElement.textContent = names.slice(1).join(' ') || '';
    } else {
        // Para login com email/senha (não tem nome)
        if (firstNameElement) firstNameElement.textContent = 'Usuário';
        if (lastNameElement) lastNameElement.textContent = '';
    }
}

// Monitora autenticação
onAuthStateChanged(auth, (user) => {
    console.log('🔐 Estado da autenticação:', user ? 'Logado' : 'Deslogado');
    
    if (user) {
        // Usuário logado - mostra informações
        displayUserInfo(user);
    } else {
        // Usuário não logado - redireciona
        console.log('➡️ Redirecionando para login...');
        window.location.href = 'index.html';
    }
});

// Logout
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logout');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja sair?')) {
                console.log('🚪 Fazendo logout...');
                signOut(auth)
                    .then(() => {
                        console.log('✅ Logout realizado');
                        window.location.href = 'index.html';
                    })
                    .catch((error) => {
                        console.error('❌ Erro no logout:', error);
                        // Redireciona mesmo com erro
                        window.location.href = 'index.html';
                    });
            }
        });
    }
    
    console.log('✅ homepage.js carregado com sucesso!');
});