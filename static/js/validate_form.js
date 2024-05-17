function validateForm() {
    const name =
        document.getElementById("name").value;
    const address =
        document.getElementById("address").value;
    const email =
        document.getElementById("email").value;
    const subject =
        document.getElementById("subject").value;
    const agree =
        document.getElementById("agree").checked;

    const nameError =
        document.getElementById("name-error");
    const addressError = document.getElementById(
        "address-error"
    );
    const emailError = document.getElementById(
        "email-error"
    );
    const subjectError = document.getElementById(
        "subject-error"
    );
    
    nameError.textContent = "";
    addressError.textContent = "";
    emailError.textContent = "";
    subjectError.textContent = "";

    let isValid = true;

    if (name === "" || /\d/.test(name)) {
        nameError.textContent =
            "Por favor ingrese un nombre válido.";
        isValid = false;
    }

    if (address === "") {
        addressError.textContent =
            "Por favor ingrese su domicilio.";
        isValid = false;
    }

    if (email === "" || !email.includes("@")) {
        emailError.textContent =
            "Por favor ingrese un email válido.";
        isValid = false;
    }

    if (subject === "") {
        subjectError.textContent =
            "Por favor seleccione un tipo de mascota.";
        isValid = false;
    }
     return isValid;
}