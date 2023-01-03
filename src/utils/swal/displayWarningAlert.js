import Swal from 'sweetalert2/dist/sweetalert2';

export default function displayWarningAlert(title) {
    Swal.fire({
        title: `${title}`,
        icon: 'warning',
        showConfirmButton: false,
        timer: 1500
    });
}