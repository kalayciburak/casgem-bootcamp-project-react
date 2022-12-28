import Swal from 'sweetalert2/src/sweetalert2.js';
export default function checkIfEmailValid() {
    document.getElementById('email').value.includes('@' && '.') ? null : Swal.showValidationMessage(
        'Please enter a valid email');
}