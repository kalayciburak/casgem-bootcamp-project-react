import {
    useEffect,
    useState
} from 'react';
import ApplicantService from '../services/ApplicantService.jsx';
import Swal from 'sweetalert2/dist/sweetalert2';
import Info from '../util/swal/Info.jsx';

export default function () {
    const [applicants, setApplicants] = useState([]);
    const applicantService = new ApplicantService();

    function deleteConfirm(applicant) {
        return Swal.fire(
            {
                title: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true
            }
        ).then((result) => {
                   if (result.isConfirmed) {
                       deleteApplicant(applicant.id);
                   }
               }
        );
    }

    async function SwalAdd() {
        let i = 1;
        const { value: firstName } = await Swal.fire
        ({
             input: 'text',
             title: `Enter your first name ${i}/7`,
             allowOutsideClick: false,
             showConfirmButton: true,
             showCancelButton: true,
             confirmButtonText: 'Next',
             inputValidator: (value) => {
                 if (!value) {
                     return 'First name is required';
                 } else if (value.length < 2) {
                     return 'First name must be at least 2 characters';
                 }
                 i++;
             }
         });
        if (firstName) {
            const { value: lastName } = await Swal.fire
            ({
                 input: 'text',
                 title: `Enter your last name ${i}/7`,
                 allowOutsideClick: false,
                 showConfirmButton: true,
                 showCancelButton: true,
                 confirmButtonText: 'Next',
                 inputValidator: (value) => {
                     if (!value) {
                         return 'Last name is required';
                     } else if (value.length < 2) {
                         return 'Last name must be at least 2 characters';
                     }
                     i++;
                 }
             });
            if (lastName) {
                const { value: dateOfBirth } = await Swal.fire(
                    {
                        html:
                            `<h1 style='margin-top:5%;font-size: 30px;font-weight: 500;color: #ffffff;'>Date of Birth ${i}/7</h1><input type='date' id='swal-input1' class='swal2-input'>`,
                        focusConfirm: false,
                        confirmButtonText: 'Next',
                        allowOutsideClick: false,
                        showCancelButton: true,
                        preConfirm: () => {
                            if (!document.getElementById('swal-input1').value) {
                                Swal.showValidationMessage('Date of birth is required');
                                Swal.enableInput();
                            }
                            if (document.getElementById('swal-input1').value > new Date().toISOString()
                                .split('T')[0]) {
                                Swal.showValidationMessage(
                                    'Date of birth cannot be in the future');
                                Swal.enableInput();
                            }
                            i++;
                            return [
                                document.getElementById(
                                    'swal-input1').value
                            ];
                        }
                    });
                if (dateOfBirth) {
                    const { value: nationalIdentity } = await Swal.fire
                    ({
                         input: 'text',
                         title: `Enter National Identity ${i}/7`,
                         allowOutsideClick: false,
                         showConfirmButton: true,
                         showCancelButton: true,
                         inputValidator: (value) => {
                             if (!value) {
                                 return 'National Identity is required!';
                             } else if (value.length !== 11) {
                                 return 'National Identity must be 11 characters!';
                             }
                             i++;
                         }
                     });
                    if (nationalIdentity) {
                        const { value: email } = await Swal.fire
                        ({
                             input: 'email',
                             title: `Enter your email ${i}/7`,
                             allowOutsideClick: false,
                             showConfirmButton: true,
                             showCancelButton: true,
                             inputValidator: (value) => {
                                 if (!value) {
                                     return 'Email is required';
                                 } else if (!value.match(
                                     '([A-Za-z0-9-_.]+@[A-Za-z0-9-_]+(?:\\.[A-Za-z0-9]+)+)')) {
                                     return 'Email must be valid';
                                 }
                                 i++;
                             }
                         });
                        if (email) {
                            const { value: password } = await Swal.fire
                            ({
                                 input: 'password',
                                 title: `Enter your password ${i}/7`,
                                 allowOutsideClick: false,
                                 showConfirmButton: true,
                                 showCancelButton: true,
                                 inputValidator: (value) => {
                                     if (!value) {
                                         return 'Password is required';
                                     } else if (value.length < 6) {
                                         return 'Password must be at least 6 characters';
                                     } else if (!value.match(/[a-z]/g)) {
                                         return 'Password must contain at least one lowercase letter';
                                     } else if (!value.match(/[A-Z]/g)) {
                                         return 'Password must contain at least one uppercase letter';
                                     } else if (!value.match(/[0-9]/g)) {
                                         return 'Password must contain at least one number';
                                     } else if (!value.match(/[^a-zA-Z\d]/g)) {
                                         return 'Password must contain at least one special character';
                                     }
                                     i++;
                                 }
                             });
                            if (password) {
                                const { value: about } = await Swal.fire
                                ({
                                     input: 'textarea',
                                     title: `Enter your about ${i}/7`,
                                     allowOutsideClick: false,
                                     showConfirmButton: true,
                                     confirmButtonText: 'Save',
                                     showCancelButton: true,
                                     inputValidator: (value) => {
                                         if (!value) {
                                             return 'About is required';
                                         } else if (value.length < 5 || value.length > 50) {
                                             return 'About must be between 5 and 50 characters';
                                         }
                                         i++;
                                     }
                                 });
                                if (about) {
                                    let applicant = {
                                        firstName: firstName,
                                        lastName: lastName,
                                        dateOfBirth: dateOfBirth[0],
                                        nationalIdentity: nationalIdentity,
                                        email: email,
                                        password: password,
                                        about: about
                                    };
                                    addApplicant(applicant);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    useEffect(() => {
        applicantService.getAll().then(result => setApplicants(result.data.data));
    }, []);

    function addApplicant(applicant) {
        applicantService.add(applicant).then(result => {
            if (result.success) {
                Info(result.message, 'success');
                applicantService.getAll().then(result => setApplicants(result.data.data));
            } else {
                Info(result.data.message, 'error');
            }
        });
    }

    function deleteApplicant(id) {
        applicantService.delete(id).then(result => {
            if (typeof result === 'string') {
                Info(result, 'success');
                applicantService.getAll()
                    .then(result => setApplicants(result.data.data));
            } else {
                applicantService.removeAnApplicant(id).then(result => {
                    console.clear();
                    if (typeof result === 'string') {
                        Info(result, 'success');
                        applicantService.getAll()
                            .then(result => setApplicants(result.data.data));
                    }
                });
            }
        });

    }

    return (
        <div>

            <div className='overflow-x-auto relative rounded-2xl'>
                <h1 className='text-3xl font-bold text-gray-700 mb-2'>Applicants Table</h1>
                <button onClick={async () => {
                    await SwalAdd();
                }}
                        className={'flex bg-green-600 text-xl text-white rounded-3xl p-3 mb-2'}>
                    Add Applicant <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'
                                       fill='currentColor'
                                       className='w-7 h-7 ml-2'>
                    <path fillRule='evenodd'
                          d='M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z'
                          clipRule='evenodd'/>
                </svg>
                </button>
                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead
                        className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th scope='col' className='py-3 px-6'>
                                First Name
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                Last Name
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                Email
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                About
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                National Identity
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                Date of Birth
                            </th>
                            <th scope='col' className='py-3 px-6'>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicants.map((applicant) => (
                            <tr key={applicant.id}
                                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                <td className='py-3 px-6'>
                                    {applicant.firstName}
                                </td>
                                <td className='py-3 px-6'>
                                    {applicant.lastName}
                                </td>
                                <td className='py-3 px-6'>
                                    {applicant.email}
                                </td>
                                <td className='py-3 px-6'>
                                    {applicant.about}
                                </td>
                                <td className='py-3 px-6'>
                                    {applicant.nationalIdentity}
                                </td>
                                <td className='py-3 px-6'>
                                    {applicant.dateOfBirth}
                                </td>
                                <td>
                                    <button onClick={() => deleteConfirm(applicant)}
                                            className={'bg-red-800 text-gray-300 p-1 rounded-xl'}>
                                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'
                                             fill='currentColor' className='w-6 h-6'>
                                            <path fillRule='evenodd'
                                                  d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z'
                                                  clipRule='evenodd'/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
