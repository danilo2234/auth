// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado - Iniciando script...');
    
    // Obtem os elementos de botão e formulários de login/cadastro
    const signUpButton = document.getElementById('signUpButton');
    const signInButton = document.getElementById('signInButton');
    const signInForm = document.getElementById('signIn');
    const signUpForm = document.getElementById('signup'); // CORREÇÃO: era 'signUp' mas no HTML é 'signup'

    console.log('Elementos encontrados:');
    console.log('signUpButton:', signUpButton);
    console.log('signInButton:', signInButton);
    console.log('signInForm:', signInForm);
    console.log('signUpForm:', signUpForm);

    // Verifica se os elementos existem antes de adicionar event listeners
    if (signUpButton && signInButton && signInForm && signUpForm) {
        console.log('Todos os elementos encontrados! Configurando event listeners...');
        
        // Configuração inicial - garante que o formulário de login está visível
        signInForm.style.display = "block";
        signUpForm.style.display = "none";

        // Quando o botão de cadastro é clicado, esconde o formulario de login e mostra o de cadastro
        signUpButton.addEventListener('click', function() {
            console.log('Mostrar formulário de cadastro');
            signInForm.style.display = "none";
            signUpForm.style.display = "block";
        });

        // Quando o botão de login é clicado, esconde o formulário de cadastro e mostra o de login
        signInButton.addEventListener('click', function() {
            console.log('Mostrar formulário de login');
            signInForm.style.display = "block";
            signUpForm.style.display = "none";
        });
        
        console.log('Event listeners configurados com sucesso!');
    } else {
        console.error('Alguns elementos não foram encontrados:');
        if (!signUpButton) console.error('❌ signUpButton não encontrado');
        if (!signInButton) console.error('❌ signInButton não encontrado');
        if (!signInForm) console.error('❌ signInForm não encontrado');
        if (!signUpForm) console.error('❌ signUpForm não encontrado');
    }
});

// Fallback: se o DOM já estiver carregado
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        const signUpForm = document.getElementById('signup');
        const signInForm = document.getElementById('signIn');
        
        if (signUpForm && signInForm) {
            signInForm.style.display = "block";
            signUpForm.style.display = "none";
        }
    }, 100);
}