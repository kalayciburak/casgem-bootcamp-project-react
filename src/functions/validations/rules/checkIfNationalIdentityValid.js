import Swal from 'sweetalert2/src/sweetalert2.js';
import checkIfOnlyNumbers from './checkIfOnlyNumbers.js';

export default function checkIfNationalIdentityValid() {
    checkIfOnlyNumbers();
    document.getElementById('national-identity').value.length == 11 ? null : Swal.showValidationMessage(
        'National Identity must be 11 characters');
}