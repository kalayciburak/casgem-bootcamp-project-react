import checkIfErrorIsObject from '../../functions/validations/rules/checkIfErrorIsObject.js';
import Swal from 'sweetalert2/dist/sweetalert2';

export default function displayErrorAlert(result, getHtml) {
    let error = checkIfErrorIsObject(result);
    Swal.fire({
        title: 'OPPS!',
        html: getHtml(error, result),
        icon: 'error',
        confirmButtonText: 'Ok'
    });
}