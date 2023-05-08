//Método para abrir las opciones de registro
const openRegister = () => {
    const names = document.getElementById("registerName")
    const subtitle = document.getElementsByTagName("h2")[0];
    const button = document.getElementsByTagName("button")[0];
    const doyou = document.getElementById("doyou");

    names.style.height = "5.5rem";
    names.style.overflow = "visible";

    subtitle.innerHTML = "Registrarse";
    button.innerHTML = "Registrarse";
    doyou.innerHTML = `¿Ya tienes una cuenta? <b onclick="openLogin()">Inicia sesión</b>`;

    button.setAttribute("onclick", "signUp()");
}
//Método para abrir las opciones de inicio de sesión
const openLogin = () => {
    const names = document.getElementById("registerName")
    const subtitle = document.getElementsByTagName("h2")[0];
    const button = document.getElementsByTagName("button")[0];
    const doyou = document.getElementById("doyou");

    names.style.height = "0";
    names.style.overflow = "hidden";

    subtitle.innerHTML = "Inicio de Sesión";
    button.innerHTML = "Iniciar sesión";
    doyou.innerHTML = `¿No tienes una cuenta? <b onclick="openRegister()">Regístrate</b>`;

    button.setAttribute("onclick", "signIn()");
}
//Método para registrar al usuario en la base de datos
const signUp = () => {
    const names = document.getElementById("names");
    const lastnames = document.getElementById("lastnames");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    
    if(names.value.trim() == 0) return showToast("Ingresa al menos un nombre");
    if(lastnames.value.trim() == 0) return showToast("Ingresa al menos un apellido");
    if(validarCorreo(email.value.trim()) == 0) return showToast("Ingresa un correo válido");
    if(password.value.trim() == 0) return showToast("Ingresa una contraseña");
    if(password.value.length < 8) return showToast("La contraseña debe tener más de 8 caractéres");


    const data = { names: names.value.trim(), lastnames: lastnames.value.trim(), email: email.value.trim().toLowerCase(), password: password.value.trim() };

    console.log(data);
    
    fetch('signup.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json() )
        .then(data => showToast(data.message))
        .catch(error => console.error(error));
}
//Método para iniciar sesión comprobando los datos en la base de datos
const signIn = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if(validarCorreo(email.value.trim()) == 0) return showToast("Ingresa un correo válido");
    if(password.value.trim() == 0) return showToast("Ingresa una contraseña");

    const data = { email: email.value.trim().toLowerCase(), password: password.value.trim() };

    console.log(data);

    fetch('signin.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => showToast(data.message) )
        .catch(error => console.error(error));
}
//Método para mostrar el mensaje que regresa el PHP de inicio de sesión y el de registro
const showToast = (message) => {
    const toast = document.getElementById("toast");
    toast.innerHTML = message;
    toast.style.width = "fit-content";
    toast.style.padding = "1rem";
    setTimeout(() => {
        toast.style.width = "0";
        toast.style.padding = "0";
        toast.style.height = "0";
    }, 5000);
}

//Función para validar si el correo es realmente un correo
const validarCorreo = (correo) => {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
  }