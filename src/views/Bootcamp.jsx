import BootcampService from '../services/BootcampService.jsx';
import {
    useEffect,
    useState
} from 'react';

export default function () {
    const [bootcamps, setBootcamps] = useState([]);
    const service = new BootcampService();

    useEffect(() => {
        service.getAll().then(result => setBootcamps(result.data.data));
    },[]);

    return (
        <div>
            <div className='overflow-x-auto relative rounded-2xl'>
                <h1 className='text-3xl font-bold mt-5 text-gray-700 mb-2'>Bootcamps Table</h1>
                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead
                        className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th scope='col' className='py-3 px-6'>
                                Name
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                First Name
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                Last Name
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                Start Date
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                End Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bootcamps.map((bootcamp) => (
                            <tr key={bootcamp.id}
                                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                <td className='py-3 px-6'>
                                    {bootcamp.name}
                                </td>
                                <td className='py-3 px-6'>
                                    {bootcamp.instructorFirstName}
                                </td>
                                <td className='py-3 px-6'>
                                    {bootcamp.instructorLastName}
                                </td>
                                <td className='py-3 px-6'>
                                    {bootcamp.startDate}
                                </td>
                                <td className='py-3 px-6'>
                                    {bootcamp.endDate}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
