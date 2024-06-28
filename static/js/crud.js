const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Funcion que permite crear un elemento <tr> para la tabla de mascotas
 * por medio del uso de template string de JS.
 */
async function showMascotas(){
    let mascotas =  await fetchData(BASEURL+'/api/mascotas/', 'GET');
    const tableMascotas = document.querySelector('#list-mascotas tbody');
    tableMascotas.innerHTML='';
    mascotas.forEach((mascota, index) => {
      let tr = `<tr>
                    <td>${mascota.nombre}</td>
                    <td>${mascota.tipo}</td>
                    <td>${mascota.sexo}</td>
                    <td>${mascota.tamanio}</td>
                    <td>${mascota.edad}</td>
                    <td>${mascota.descripcion}</td>
                    <td>
                        <img src="${mascota.url_foto}" width="30%">
                    </td>
                    <td>
                        <button class="pet-btn" onclick='updateMascota(${mascota.id_mascota})'><i class="fa fa-pencil" ></button></i>
                        <button class="pet-btn" onclick='deleteMascota(${mascota.id_mascota})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
      tableMascotas.insertAdjacentHTML("beforeend",tr);
    });
}

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de pelicula
 * @returns 
 */
async function saveMascota(){
    const idMascota = document.querySelector('#id_mascota').value;
    const nombre = document.querySelector('#nombre').value;
    const tipo = document.querySelector('#tipo').value;
    const sexo = document.querySelector('#sexo').value;
    const tamanio = document.querySelector('#tamanio').value;
    const edad = document.querySelector('#e-mascota').value;
    const descripcion = document.querySelector('#descripcion').value;
    const url_foto = document.querySelector('#url-foto').value;
    //VALIDACION DE FORMULARIO
    if (!nombre || !tipo || !sexo || !tamanio || !edad || !descripcion || !url_foto) {
      Swal.fire({
          title: 'Error!',
          text: 'Por favor completa todos los campos.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
      });
      return;
    }
    // Crea un objeto con los datos de la película
    const mascotaData = {
        nombre: nombre,
        tipo: tipo,
        sexo: sexo,
        tamanio: tamanio,
        edad: edad,
        descripcion: descripcion,
        url_foto: url_foto,
    };
  let result = null;
  // Si hay un idMascota, realiza una petición PUT para actualizar la mascota existente
  if(idMascota!==""){
    result = await fetchData(`${BASEURL}/api/mascotas/${idMascota}`, 'PUT', mascotaData);
  }else{
    // Si no hay idMascota, realiza una petición POST para crear una nueva mascota
    result = await fetchData(`${BASEURL}/api/mascotas/`, 'POST', mascotaData);
  }
  
  const formMascota = document.querySelector('#crud-form');
  formMascota.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showMascotas();
}

/**
 * Function que permite eliminar una mascota en función de su id
 * @param {number} id posición del array que se va a eliminar
 */
function deleteMascota(id){
    Swal.fire({
        title: "Esta seguro de eliminar esta mascota?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await fetchData(`${BASEURL}/api/mascotas/${id}`, 'DELETE');
          showMascotas();
          Swal.fire(response.message, "", "success");
        }
    });
    
}

/**
 * Function que permite cargar el formulario con los datos de la mascota para su edición
 * @param {number} id Id de la mascota que se quiere editar
 */
async function updateMascota(id){
    //Buscamos en el servidor la mascota de acuerdo al id
    let response = await fetchData(`${BASEURL}/api/mascotas/${id}`, 'GET');
    console.log(response)
    const idMascota = document.querySelector('#id_mascota');
    const nombre = document.querySelector('#nombre');
    const tipo = document.querySelector('#tipo');
    const sexo = document.querySelector('#sexo');
    const tamanio = document.querySelector('#tamanio');
    const edad = document.querySelector('#e-mascota');
    const descripcion = document.querySelector('#descripcion');
    const url_foto = document.querySelector('#url-foto');
    
    idMascota.value = response.id_mascota;
    console.log(response.id_mascota);
    console.log(idMascota.value);
    nombre.value = response.nombre;
    tipo.value = response.tipo;
    sexo.value = response.sexo;
    tamanio.value = response.tamanio;
    edad.value = response.edad;
    descripcion.value = response.descripcion;
    url_foto.value = response.url_foto;
}

//Escuchar el evento 'DOMContentLoader' que se dispara cuando el contenido del DOM ha sido completamente cargado y parseado
document.addEventListener('DOMContentLoaded', function(){
    const btnSaveMascota = document.querySelector('#btn-save-mascota');
    //Asocio una función al evento click del botón
    btnSaveMascota.addEventListener('click', saveMascota);
    showMascotas();
});

