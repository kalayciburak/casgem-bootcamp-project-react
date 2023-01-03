import {useEffect, useState} from 'react';
import InstructorService from '../services/InstructorService.jsx';

export default function () {
    const [instructors, setInstructors] = useState([]);
    const instructorService = new InstructorService();

    useEffect(() => {
        instructorService.getAll().then(result => setInstructors(result.data.data));
    }, []);

    return (
        <div>

            <div className="overflow-x-auto relative rounded-2xl">
                <h1 className="text-3xl font-bold text-gray-700 mt-5 mb-2">Instructors Table</h1>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                First Name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Last Name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Email
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Company Name
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {instructors.map((instructor) => (
                            <tr key={instructor.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="py-3 px-6">
                                    {instructor.firstName}
                                </td>
                                <td className="py-3 px-6">
                                    {instructor.lastName}
                                </td>
                                <td className="py-3 px-6">
                                    {instructor.email}
                                </td>
                                <td className="py-3 px-6">
                                    {instructor.companyName}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
