

// TENTEI FAZER O INPUT DE TELEFONE ACEITAR APENAS NÚMEROS


const inputTelefone = document.getElementById("telefone");

// Bloqueia teclas não numéricas
inputTelefone.addEventListener("keydown", function (event) {
    if (
        !/[0-9]/.test(event.key) &&
        !["Backspace", "Tab", "Delete", "ArrowLeft", "ArrowRight"].includes(event.key)
    ) {
        event.preventDefault();
    }
});

// Valida quando o usuário cola texto (Ctrl+V)
inputTelefone.addEventListener("paste", function (event) {
    const textoColado = (event.clipboardData || window.clipboardData).getData("text");
    if (!/^[0-9]+$/.test(textoColado)) {
        event.preventDefault(); // Cancela o "paste" se não for número
        alert("Apenas números são permitidos!");
    }
});

document.getElementById("telefone").addEventListener("input", function(event) {
    // Remove tudo que não for número
    this.value = this.value.replace(/[^0-9]/g, "");
  });