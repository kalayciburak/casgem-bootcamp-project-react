import Swal from 'sweetalert2/src/sweetalert2.js';

export default function checkIfAllInputsValid() {
    document.getElementById('first-name').value < 2 ? Swal.showValidationMessage(
        'First Name must be at least 2 characters') : null;
}