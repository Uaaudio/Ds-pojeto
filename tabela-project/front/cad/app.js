document.getElementById("formCadastro").addEventListener("submit", async function (event){
    event.preventDefault();

    //coletar os dados do formulário

    const nome = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const dados = {
    nome: nome,
    email: email,
    senha: senha
    };

    try {
        // enviar os dados em formato JSON no corpo da requisição
        const response = await fetch('http://127.0.0.1:3000/usuarios/cadastro',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // enviar no formato JSON
            },
            body: JSON.stringify(dados) //enviar os dados no corpo da requisição
        });
        const resultado = await response.json();
        if (response.ok){
            alert('Usuário cadastrado com sucesso!');
            window.location.href= '../login/index.html'
        }
        else {
            alert(`Erro: ${resultado.error}`);
        }
    }
    catch  (error){
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao enviar dados para o servidor.');
    }
} 

);

document.addEventListener('DOMContentLoaded', function (){
    const senha = document.getElementById('senha');
    const senhaConfirmacao = document.getElementById('confirmacaoSenha');
    const errorMessage = document.getElementById('errorMessage');
    const submitButton = document.querySelector('button[type="submit"]');
    
    function verificarSenha (){
        if (senha.value !== senhaConfirmacao.value){
            errorMessage.style.display = 'block' // exibe mensagem de erro de senha
            submitButton.disabled = true; // desabilita botao cadastrar
        }
        else {
            errorMessage.style.display = 'none'; // esconde mensagem de erro de senha
            submitButton.disabled = false // habilita botao cadastrar
        }
    }

    // adicionar eventos de input para validar em tempo real
    senha.addEventListener('input',verificarSenha);
    senhaConfirmacao.addEventListener('input',verificarSenha);
    
});

