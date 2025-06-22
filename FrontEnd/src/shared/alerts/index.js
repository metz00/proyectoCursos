import Swal from 'sweetalert2'

const alerts = {
  showSuccess(message = 'Operación realizada correctamente') {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: undefined,
      html: `
        <i class="mdi mdi-check-circle-outline text-green-600 text-lg" style="vertical-align: middle;"></i>
        <span class="ml-2"><strong>¡Éxito!</strong> ${message}</span>
      `,
      background: '#f0fdf4',
      color: '#166534',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
  },

  showError(message = 'Ha ocurrido un error') {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: undefined,
      html: `
        <i class="mdi mdi-alert-circle-outline text-red-600 text-lg" style="vertical-align: middle;"></i>
        <span class="ml-2"><strong>Error:</strong> ${message}</span>
      `,
      background: '#fef2f2',
      color: '#991b1b',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
    })
  },

  async showConfirm(message = '¿Estás seguro de continuar?') {
    const result = await Swal.fire({
      title: '<i class="mdi mdi-help-circle-outline text-yellow-500 mr-2"></i> Confirmar acción',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#A5DC86',
      cancelButtonColor: '#F27474',
    })
    return result.isConfirmed
  },
}

export default alerts
