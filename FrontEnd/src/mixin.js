import Swal from 'sweetalert2';
import qs from 'querystring';

export const mixin = {
  methods: {
    mostrarMensajeEliminar(mensaje){
        Swal.fire({
            title: `<font face="Urbanist" center>${mensaje}</font>`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    },


    mostrarMensajeConfirmacion(mensaje) {
        Swal.fire({
            icon: 'success',
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 5000,
            title: `<font face="Urbanist" center>${mensaje}</font>`,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
    },


    mostrarMensajeAdvertencia(mensaje) {
        Swal.fire({
            icon: 'warning',
            title: '',
            html: `<font face="Urbanist">${mensaje}</font>`,
        });
    },
    mostrarMensajeInicioSesion(mensaje) {
        let timerInterval
        Swal.fire({
            icon: 'success',
            title: `<font face="Urbanist">${mensaje}</font>`,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,



            willClose: () => {
                clearInterval(timerInterval)
            }
        });
    },
    mostrarMensajeError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: '',
            html: `<font face="Urbanist">${mensaje}</font>`,
        });
    },
    mostrarMensajeLoginError(mensaje){
        let timerInterval
        Swal.fire({
          title: 'ACCESO DENEGADO',
          html: `<font face="Urbanist">${mensaje}</font>`,
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
    },

    enviarPeticionAPI(url, datos = {}, metodo = "GET") {
        const respuesta = {
            mensaje: '',
            datos: []
        };
        const configuracionPeticion = {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'token': localStorage.getItem('token'),
            }
        };
       if (window.localStorage.token) {
            configuracionPeticion.headers['Authorization'] = 'Bearer ' + window.localStorage.token;
        }

        if (metodo == "GET" && Object.keys(datos).length) {
            url += '?' + qs.stringify(datos);
        } else {
            if (Object.keys(datos).length) configuracionPeticion.body = JSON.stringify(datos);
        }
        return fetch(url, configuracionPeticion).then(async (respuestaHttp) => {
            if (!respuestaHttp.ok) {
                const respuestaError = { tipo: '', mensaje: '' };

                if (respuestaHttp.status == 500) {
                    respuestaError.tipo = 'error';
                    respuestaError.mensaje = 'Primero elimina los Registros Pertenecientes a este campo';
                }
                if (respuestaHttp.status == 400) {
                    respuestaError.tipo = 'warning';
                    respuestaError.mensaje = await respuestaHttp.json().then((objeto) => {
                        return objeto.message;
                    });
                }

                if (respuestaHttp.status == 401) {
                    respuestaError.tipo = 'warning';
                    respuestaError.mensaje = 'Acceso denegado';

                }
                if (respuestaHttp.status == 403) {
                    respuestaError.tipo = 'warning';
                    respuestaError.mensaje = 'No tienes los privilegios para hacer esta accion';


                }

                if (respuestaHttp.status == 404) {
                    respuestaError.tipo = 'warning';
                    respuestaError.mensaje = 'Ruta inválida o recurso no encontrado';
                }

                if (respuestaHttp.status == 422) {
                    respuestaError.tipo = 'warning';
                    respuestaError.mensaje = await respuestaHttp.json().then(() => {
                        const respuestaValidaciones = "Favor de llenar todos los campos";
                        // const ul = document.createElement('ul');
                        // Object.keys(objeto.errors).forEach(indice => {
                        //     const li = document.createElement('p');//li
                        //     li.innerText = objeto.errors[indice][0];
                        //     ul.append(li);
                        // });
                        // return ul.outerHTML;
                        return respuestaValidaciones;
                    });
                }

                throw respuestaError;
            } else {
                if (respuestaHttp.status == 204) {
                    return {};
                }
                return respuestaHttp.json();
            }
        }).then((respuestaJson) => {
            // console.log(respuestaJson);
            // console.log(respuestaJson.message);
            if (respuestaJson.data) {respuesta.datos = respuestaJson.data;}
            if (respuestaJson.message != undefined ) {respuesta.mensaje = respuestaJson.message;}

            return respuesta;
        })
            .catch(({ tipo, mensaje }) => {
                if (mensaje == "Acceso denegado") {
                    tipo = 'error';
                }
                if (mensaje != undefined) {
                    Swal.fire({
                        icon: tipo,
                        title: `<font face="Urbanist">${mensaje}</font>`,
                        //width: '30%',
                        backdrop: `
                    rgba(255,0,0,0.4)
                    left top
                    `,

                    });
                }
            });
    },
    enviarPeticionAPIproducto(url, datos = {}, metodo = "GET") {
        const respuesta = {
            mensaje: '',
            datos: []
        };
        const configuracionPeticion = {
            method: metodo,
            headers: {
                'content-type': 'application/form-data',
                'X-Requested-With': 'XMLHttpRequest',
                'token': localStorage.getItem('token'),
            }
        };
       if (window.localStorage.token) {
            configuracionPeticion.headers['Authorization'] = 'Bearer ' + window.localStorage.token;
        }

        if (metodo == "GET" && Object.keys(datos).length) {
            url += '?' + qs.stringify(datos);
        } else {
            if (Object.keys(datos).length) configuracionPeticion.body = JSON.stringify(datos);
        }
        return fetch(url, configuracionPeticion).then(async (respuestaHttp) => {
            if (!respuestaHttp.ok) {
                const respuestaError = { tipo: '', mensaje: '' };

                if (respuestaHttp.status == 500) {
                    respuestaError.tipo = 'error';
                    respuestaError.mensaje = 'Error en la aplicación';
                }

                if (respuestaHttp.status == 400) {
                    respuestaError.tipo = 'warning';
                    respuestaError.mensaje = await respuestaHttp.json().then((objeto) => {
                        return objeto.message;
                    });
                }

                if (respuestaHttp.status == 401) {
                    respuestaError.tipo = 'warning';
                    respuestaError.mensaje = 'Acceso denegado';

                }
                if (respuestaHttp.status == 403) {
                    respuestaError.tipo = 'warning';
                    respuestaError.mensaje = 'No tienes los privilegios para hacer esta accion';


                }

                if (respuestaHttp.status == 404) {
                    respuestaError.tipo = 'warning';
                    respuestaError.mensaje = 'Ruta inválida o recurso no encontrado';
                }

                if (respuestaHttp.status == 422) {
                    respuestaError.tipo = 'warning';
                    respuestaError.mensaje = await respuestaHttp.json().then(() => {
                        const respuestaValidaciones = "Favor de llenar todos los campos";
                        // const ul = document.createElement('ul');
                        // Object.keys(objeto.errors).forEach(indice => {
                        //     const li = document.createElement('p');//li
                        //     li.innerText = objeto.errors[indice][0];
                        //     ul.append(li);
                        // });
                        // return ul.outerHTML;
                        return respuestaValidaciones;
                    });
                }

                throw respuestaError;
            } else {
                if (respuestaHttp.status == 204) {
                    return {};
                }
                return respuestaHttp.json();
            }
        }).then((respuestaJson) => {
            // console.log(respuestaJson);
            // console.log(respuestaJson.message);
            if (respuestaJson.data) {respuesta.datos = respuestaJson.data;}
            if (respuestaJson.message != undefined ) {respuesta.mensaje = respuestaJson.message;}

            return respuesta;
        })
            .catch(({ tipo, mensaje }) => {
                if (mensaje == "Acceso denegado") {
                    tipo = 'error';
                }
                if (mensaje != undefined) {
                    Swal.fire({
                        icon: tipo,
                        title: `<font face="Urbanist">${mensaje}</font>`,
                        //width: '30%',
                        backdrop: `
                    rgba(255,0,0,0.4)
                    left top
                    `,

                    });
                }
            });
    },
    obtenerUsuario() {
        return JSON.parse(window.localStorage.token);
    },


}
};
