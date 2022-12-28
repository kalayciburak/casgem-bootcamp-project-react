import Swal from 'sweetalert2/src/sweetalert2.js';
export default function checkIfPasswordsMatch() {
    document.getElementById('password').value === document.getElementById(
        'confirm-password').value
        ? null : Swal.showValidationMessage('Passwords do not match');
}