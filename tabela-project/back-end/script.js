function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Por favor, preencha todos os campos.");
    } else {
        alert("Login bem-sucedido!");
    }
}