import {
    useEffect,
    useState
} from 'react';
import ApplicantService from '../services/ApplicantService.jsx';
import Swal from 'sweetalert2/dist/sweetalert2';

export default function () {
    const [applicants, setApplicants] = useState([]);
    const applicantService = new ApplicantService();

    function alert(result, icon) {
        Swal.fire({
                      position: 'center',
                      icon: icon,
                      title: result,
                      showConfirmButton: false,
                      timer: 1500
                  });
    }

    useEffect(() => {
        applicantService.getAll().then(result => setApplicants(result.data.data));
    }, []);

    function addApplicant(applicant) {
        applicantService.add(applicant).then(result => {
            if (result.success) {
                alert(result.message, 'success');
                applicantService.getAll().then(result => setApplicants(result.data.data));
            } else {
                alert(result.data, 'error');
            }
        });
    }

    function deleteApplicant(id) {
        applicantService.delete(id).then(result => {
            alert(result, 'success');
            applicantService.getAll().then(result => setApplicants(result.data.data));
        });
    }

    let applicant = {
        firstName: 'Burak',
        lastName: 'Kalaycı',
        dateOfBirth: '1999-01-01',
        nationalIdentity: '11111111114',
        email: 'torukobyte@gmail.com',
        password: 'A1b2c3123.*',
        about: 'hello React!'
    };

    return (
        <div>

            <div className='overflow-x-auto relative rounded-2xl'>
                <h1 className='text-3xl font-bold text-gray-700 mb-2'>Applicants Table</h1>
                <button onClick={() => {
                    Swal.fire({
                                  title: 'Add Applicant'

                              });
                    addApplicant(applicant);
                    Swal.fire({
                                  position: 'center',
                                  icon: 'success',
                                  title: 'Applicant Added',
                                  showConfirmButton: false,
                                  timer: 1500
                              });

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
                                <td>
                                    <button onClick={() => Swal.fire(
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
                                    )} className={'bg-red-800 text-gray-300 p-1 rounded-xl'}>
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
