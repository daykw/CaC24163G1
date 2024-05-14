let btnSolicitud = document.querySelector('#btn-solicitud');

btnSend.addEventListener('click',function(){
    let name = document.querySelector('#name');    
    let lname = document.querySelector('#lname');    
    let email = document.querySelector('#email');    

    if(firstname.value.trim()==''){
        firstname.classList.add('error');
        let  errorFirstname = document.querySelector('#error-name');
        errorFirstname.innerHTML = 'Debes completar el campo Nombre';
    }

    if(lastname.value.trim()==''){
        lastname.classList.add('error');
        let  errorLastname = document.querySelector('#error-lname');
        errorLastname.innerHTML = 'Debes completar el campo Apellido';        
    }
    
    
})