import Swal from 'sweetalert2/src/sweetalert2.js';

export default function checkIfPasswordValid() {
    document.getElementById('password').
        value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/) === null
        ? Swal.showValidationMessage(
            'Password must be between 8 and 15 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character')
        : null;
}