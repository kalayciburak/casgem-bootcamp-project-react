import Swal from 'sweetalert2/src/sweetalert2.js';

export default function checkIfNationalIdentityChange(data) {
    document.getElementById('national-identity').value === data.nationalIdentity ? Swal.showValidationMessage(
        'National Identity is the same as before') : null;
}