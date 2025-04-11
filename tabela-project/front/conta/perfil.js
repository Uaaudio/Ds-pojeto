document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/usuarios/perfil', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error("Erro ao carregar dados do perfil")
        }
        const usuario = await response.json();

        //preenchendo elementos com dados recebidos

        document.getElementById("nomeUsuario").textContent = usuario.nome
        document.getElementById("cargoUsuario").textContent = usuario.nivel_acesso
        document.getElementById("emailUsuario").textContent = usuario.email
        document.getElementById("email").href = `mailto:${usuario.email}`;
    } catch (error) {
        console.error('Erro ao buscar dados do usuario:', error);
        alert('Erro ao carregar perfil. Realize login novamente.');
        window.location.href = '../login/index.html'
    }
})