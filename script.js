//obtem os elementos de botão e formularios de login/cadastro
const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signUp');

//quando o botão de cadastro é clicado, esconde o formulario de login e mostra o de cadastro
signUpButton.addEventListener('click', function() {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
});

//quando o botão de login é clicado, esconde o formulário de cadastro e mostra o de login
signInButton.addEventListener('click', function() {
    signInForm.style.display = "block";
    signUpForm.style.display = "none";
});

// Importa a função de login com Google do firebaseauth.js
document.addEventListener('DOMContentLoaded', function() {
    // Recupera os botões de login com Google
    const googleSignUpBtn = document.getElementById('googleSignUp');
    const googleSignInBtn = document.getElementById('googleSignIn');
    
    // Função para lidar com o login do Google
    function handleGoogleLogin() {
        // Chama a função signInWithGoogle que está definida no firebaseauth.js
        if (typeof signInWithGoogle === 'function') {
            signInWithGoogle()
                .then((result) => {
                    // O redirecionamento já é tratado dentro da função signInWithGoogle
                    console.log('Login com Google realizado com sucesso!', result);
                })
                .catch((error) => {
                    // Os erros já são tratados dentro da função signInWithGoogle
                    console.error('Erro no login com Google:', error);
                });
        } else {
            console.error('Função signInWithGoogle não encontrada');
            showMessage('Erro de configuração. Recarregue a página.', 'signInMessage');
        }
    }
    
    // Adiciona event listeners para os botões do Google
    if (googleSignUpBtn) {
        googleSignUpBtn.addEventListener('click', handleGoogleLogin);
    }
    
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', handleGoogleLogin);
    }
    
    // Função auxiliar para exibir mensagens (caso precise)
    function showMessage(message, divId) {
        const messageDiv = document.getElementById(divId);
        if (messageDiv) {
            messageDiv.style.display = "block";
            messageDiv.innerHTML = message;
            messageDiv.style.opacity = 1;
            setTimeout(function() {
                messageDiv.style.opacity = 0;
            }, 5000);
        }
    }
});