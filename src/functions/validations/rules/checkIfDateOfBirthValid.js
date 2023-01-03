import Swal from 'sweetalert2/src/sweetalert2.js';

export default function checkIfDateOfBirthValid() {
    document.getElementById('date').value > new Date().toISOString().split('T')[0]
        ? Swal.showValidationMessage('Please enter a valid date') : null;
}