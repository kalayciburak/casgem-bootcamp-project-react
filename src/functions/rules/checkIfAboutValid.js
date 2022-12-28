import Swal from 'sweetalert2/src/sweetalert2.js';

export default function checkIfAboutValid() {
    document.getElementById('about').value.length < 10 ? Swal.showValidationMessage(
        'About must be at least 10 characters') : null;
}