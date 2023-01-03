import {useEffect, useState} from 'react';
import EmployeeService from '../services/EmployeeService.jsx';

export default function () {
    const [employees, setEmployees] = useState([]);
    const employeeService = new EmployeeService();

    useEffect(() => {
        employeeService.getAll().then(result => setEmployees(result.data.data));
    }, []);

    return (
        <div>

            <div className="overflow-x-auto relative rounded-2xl">
                <h1 className="text-3xl font-bold text-gray-700 mt-5 mb-2">Employees Table</h1>
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
                                Position
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="py-3 px-6">
                                    {employee.firstName}
                                </td>
                                <td className="py-3 px-6">
                                    {employee.lastName}
                                </td>
                                <td className="py-3 px-6">
                                    {employee.email}
                                </td>
                                <td className="py-3 px-6">
                                    {employee.position}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
