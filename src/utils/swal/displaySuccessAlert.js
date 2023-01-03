import Swal from 'sweetalert2/dist/sweetalert2';

export default function (result, icon) {
    Swal.fire(
        {
            position: 'center',
            icon: icon,
            title: result,
            showConfirmButton: false,
            timer: 1500
        });
}
