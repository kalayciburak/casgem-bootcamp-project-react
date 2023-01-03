import Swal from 'sweetalert2/src/sweetalert2.js';

export default function checkIfOnlyNumbers() {
    document.getElementById('national-identity').value.match(/^[0-9]+$/g) === null
        ? Swal.showValidationMessage('Please enter only numbers') : null;
}