import {
    useEffect,
    useState
} from 'react';
import ApplicantService from '../services/ApplicantService.jsx';
import AddButton from '../components/AddButton';

export default function (props) {
    const [applicants, setApplicants] = useState([]);
    const applicantService = new ApplicantService();

    useEffect(() => {
        applicantService.getAll().then(result => setApplicants(result.data.data));
    }, []);

    return (
        <div>

            <div className='overflow-x-auto relative rounded-2xl'>
                <h1 className='text-3xl font-bold text-gray-700 mb-2'>Applicants Table</h1><AddButton></AddButton>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
