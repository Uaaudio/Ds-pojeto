async function login () {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
        const response = await fetch("http://127.0.0.1:3000/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include", // Permite o envio do cookie de sessão
            body: JSON.stringify({ email, senha })
        });

        const resultado = await response.json();

        if (response.ok) {
            alert("Login realizado com sucesso!");
            window.location.href = "../main/indes.html"; // redirecionar após login
        } else {
            alert(`Erro: ${resultado.error}`);
        }

    } catch (error) {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao conectar com o servidor.");
    }
}
