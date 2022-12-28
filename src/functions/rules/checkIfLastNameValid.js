import Swal from 'sweetalert2/src/sweetalert2.js';
export default function checkIfLastNameValid() {
    document.getElementById('last-name').value < 2 ? Swal.showValidationMessage(
            'Last Name must be at least 2 characters') : null;
}