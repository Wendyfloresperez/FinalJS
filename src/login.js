form("Login", "Ingresar", "Cancelar", "Registrarse");

function changeFormRegistry(){
  form("Registro", "Crear", "Cancelar");
}
function changeFormLogin(){
  form("Login", "Ingresar", "Cancelar", "Registrarse");
}

// crea el formulario de login de forma dinamica
function form(tittles, button1, button2, button3 = ''){
  const divLogin = document.getElementById("loginDiv");
  if(divLogin){
    const divTittle = document.createElement("div");
    const tittle = document.createElement("h5");
    tittle.textContent = `${tittles}`;
  
    const form = document.createElement("form");
    form.setAttribute("id", "formLogin")
    const hr = document.createElement("hr");
    const hrBut = document.createElement("hr");
  
    const labelUserName = document.createElement("label");
    labelUserName.classList.add("form-label");
    labelUserName.textContent="Nombre de Usuario";
  
    const labelPassword = document.createElement("label");
    labelPassword.classList.add("form-label");
    labelPassword.textContent="Password";
  
    const inputUserName = document.createElement("input");
    inputUserName.classList.add("form-control");
    inputUserName.setAttribute("type", "email");
    inputUserName.setAttribute("id", "userName");
    inputUserName.setAttribute("placeholder", "user@gmail.com");
   
    const inputPassword = document.createElement("input");
    inputPassword.classList.add("form-control");
    inputPassword.setAttribute("type", "password");
    inputPassword.setAttribute("id", "password");

    const divUserName = document.createElement("div");
    divUserName.classList.add("mb-3");
  
    const divPassword = document.createElement("div");
    divPassword.classList.add("mb-3");
    
    const divButtons = document.createElement("div");
    divButtons.setAttribute("id", "divButtons");
  
  
    // const buttonSucces = document.createElement("button");
    // buttonSucces.setAttribute("type", "submit");
    // buttonSucces.classList.add("btn", "btn-success");
    // buttonSucces.textContent = `${button1}`;

    const buttonSucces = document.createElement("button");
    buttonSucces.setAttribute("type", "button");
    buttonSucces.classList.add("btn", "btn-success");
    buttonSucces.textContent = `${button1}`;  
    
  
    const buttonCancel = document.createElement("button");
    buttonCancel.setAttribute("type", "button");
    buttonCancel.classList.add("btn", "btn-danger");
    buttonCancel.textContent = `${button2}`;
  
    if(button3 != ''){
      buttonSucces.addEventListener("click", validateUser);
      buttonCancel.addEventListener("click", redirectIndex);
  
      const buttonRegistry = document.createElement("button");
      buttonRegistry.setAttribute("type", "button");
      buttonRegistry.classList.add("btn", "btn-info");
      buttonRegistry.textContent = `${button3}`;

      divButtons.appendChild(buttonRegistry);

      buttonRegistry.addEventListener("click", changeFormRegistry);
    }else{
      buttonCancel.addEventListener("click", changeFormLogin);
      buttonSucces.addEventListener("click", createUsers);
    }
  
    divTittle.appendChild(tittle);
  
    divUserName.appendChild(labelUserName);
    divUserName.appendChild(inputUserName);
    divPassword.appendChild(labelPassword);
    divPassword.appendChild(inputPassword);
  
    form.appendChild(divTittle);
    form.appendChild(hr);
    form.appendChild(divUserName);
    form.appendChild(divPassword);
    form.appendChild(hrBut);
    form.appendChild(buttonSucces);
    
    divButtons.appendChild(buttonCancel);
    divLogin.replaceChildren(form, divButtons);
  }
}

function redirectIndex() {
  location.assign("../index.html");
}

function redirectLogin() {
  location.assign("../login.html");
}

const htmlLogin = () => {
  const login = localStorage.getItem("login");
  if(!login){
    localStorage.setItem("login", false);
  }
  const htmlLog = document.getElementById("login");
  const buttonLogin = document.createElement("button");
  buttonLogin.setAttribute("id", "loginId");
  buttonLogin.classList.add("btn", "btn-primary");
  buttonLogin.textContent = "Login";
  buttonLogin.addEventListener("click", redirectLogin);
  const buttonLogout = document.createElement("button");
  buttonLogout.setAttribute("id", "logoutId");
  buttonLogout.classList.add("btn", "btn-danger");
  buttonLogout.textContent = "Logout";
  buttonLogout.addEventListener("click", logout);
  htmlLog.appendChild(buttonLogin);
  htmlLog.appendChild(buttonLogout);
  changeLoginHtml();
};

const logout = () => {
  localStorage.clear();
  localStorage.clear();
  return changeLoginHtml();
};

function changeLoginHtml() {
  const validation = localStorage.getItem("login");
  const buttonLogin = document.getElementById("loginId");
  const buttonLogout = document.getElementById("logoutId");
  if (validation === "true") {
    buttonLogin.setAttribute("hidden", "");
    buttonLogout.removeAttribute("hidden");
  } else {
    buttonLogout.setAttribute("hidden", "");
    buttonLogin.removeAttribute("hidden");
  }
}

const users = [
  // User para hacer pruebas sin tener que estar creando uno constantemente
  {
    name: "admin",
    password: 1234,
  },
];

// Crea Objetos de los usuarios y los almacena en la constante users
function createUsers () {
  const userName = document.getElementById("userName").value;
  const password = document.getElementById("password").value;
  if(userName && password && userName != '' && password != '' && userName.includes("@") && userName.length > 3){
    if (users.find((user) => user.name === userName)) {
      swal(
        'Error!',
        'Ya existe un usuario con este correo electronico',
        'error'
      )
      return '';
    }
    users.push({ name: userName, password: password });
    swal(
      'Success',
      `Usuario Creado Exitosamente, 
      Realice su primer login para poder comenzar a comprar`,
      'success'
    );
    changeFormLogin();
    return '';
  }else{
    swal(
      'Error!',
      `El usuario debe ser una direccion de correo valida y la password no puede estar en blanca`,
      'error'
    );
  }

};

// Valida si el usuario y contraseña coinciden
async function validateUser () {
  const userName = document.getElementById("userName").value;
  const password = document.getElementById("password").value;
  const existUser = users.find(
    (user) => String(user.name) === String(userName)
  );
  if (existUser && String(existUser.password) === String(password)) {
    localStorage.setItem("userName", userName);
    localStorage.setItem("login", "true");
    await swal({
      title: `Bienvenido/a ${userName} `,
      imageUrl: './img/logo.png',
      imageWidth: 500,
      imageHeight: 500,
      imageAlt: 'Custom image',
    })
    changeLoginHtml();
    redirectIndex();
    return '';
  } else {
      swal(
        'Error!',
        'El usuario o contraseña son incorrectos',
        'error'
      )
    return '';
  }
  
};

htmlLogin();
