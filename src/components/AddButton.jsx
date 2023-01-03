import Swal from 'sweetalert2';
import {useState} from 'react';

export default function () {
    const [firstName, setFirstName] = useState('');
    return (
        <button className={'bg-green-600 text-gray-900 p-3 text-2xl font-bold rounded-3xl border-2'}
                onClick={async () => {
                    const {value: text} = await
                        Swal.fire(
                            {
                                input: 'text',
                                inputLabel: 'Message',
                                inputPlaceholder: 'Type your message here...',
                                inputAttributes: {
                                    'aria-label': 'Type your message here'
                                },
                                showCancelButton: true
                            });
                    if (text) {
                        await Swal.fire(text);
                        setFirstName(text);
                    }
                }}>
            Add Applicant {firstName}
        </button>
    );
}
