import {useEffect} from 'react';
import Swal from 'sweetalert2/src/sweetalert2.js';

function GlobalExceptionHandler() {
    useEffect(() => {
        const handleError = (error) => {
            Swal.fire({
                title: 'OPPS!',
                html: error.error.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        };

        window.addEventListener('error', handleError);

        return () => {
            window.removeEventListener('error', handleError);
        };
    }, []);

    return null;
}

export default GlobalExceptionHandler;