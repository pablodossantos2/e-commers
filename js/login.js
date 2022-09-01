const alerta = `<div class="alert alert-danger alert-dismissible fade show signin " role="alert" id="alert-danger">
<p>Han quedado campos sin rellenar</p>
<button id="eliminarcartel" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("botonIngresar").addEventListener("click", function () {

        console.log(noEstanVacio())
        if (noEstanVacio()) {
            localStorage.setItem("email", document.getElementById("email").value);
            window.location = "index.html";

        }
        else {
            document.getElementById("alerta").innerHTML = alerta;
            document.getElementById("eliminarcartel").addEventListener("click", function () {
                document.getElementById("alerta").innerHTML = '';

            })
        }
    });


});

function noEstanVacio() {
    let arr = ["email", "contraseña"];
    let noEstaVacio = true;
    let i = 0;
    while (noEstaVacio && i < arr.length) {
        console.log(document.getElementById(arr[i]).value, arr[i])
        noEstaVacio = noEstaVacio && document.getElementById(arr[i]).value !== '';
        i++;
    }
    return noEstaVacio;
}
