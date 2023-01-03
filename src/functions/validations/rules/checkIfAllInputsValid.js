import Swal from 'sweetalert2/src/sweetalert2.js';

export default function checkIfAllInputsValid() {
    document.querySelectorAll('#first-name,#last-name,#email,#about,#national-identity,#date').
        forEach(
            (input) => input.value === ''
                ? Swal.showValidationMessage(`Please enter ${input.placeholder}`) : null);
}