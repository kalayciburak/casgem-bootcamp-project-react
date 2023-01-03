import {useEffect, useState} from 'react';
import ApplicantService from '../services/ApplicantService.jsx';
import Swal from 'sweetalert2/src/sweetalert2.js';
import displaySuccessAlert from '../utils/swal/displaySuccessAlert.js';
import checkIfAboutValid from '../functions/validations/rules/checkIfAboutValid.js';
import checkIfEmailValid from '../functions/validations/rules/checkIfEmailValid.js';
import checkIfLastNameValid from '../functions/validations/rules/checkIfLastNameValid.js';
import checkIfFirstNameValid from '../functions/validations/rules/checkIfFirstNameValid.js';
import checkIfPasswordsMatch from '../functions/validations/rules/checkIfPasswordsMatch.js';
import checkIfPasswordValid from '../functions/validations/rules/checkIfPasswordValid.js';
import checkIfNationalIdentityValid from '../functions/validations/rules/checkIfNationalIdentityValid.js';
import checkIfDateOfBirthValid from '../functions/validations/rules/checkIfDateOfBirthValid.js';
import checkIfAllInputsValid from '../functions/validations/rules/checkIfAllInputsValid.js';
import displayErrorAlert from '../utils/swal/displayErrorAlert.js';
import checkIfAnyChangesAreMade from '../functions/validations/checkIfAnyChangesAreMade.js';

export default function () {
    const [applicants, setApplicants] = useState([]);
    const applicantService = new ApplicantService();

    function getHtml(error, result) {
        return typeof error === 'object' ? error.map(
            (err) => `<p class="swal2-validation-message">${err}</p>`).join('') : result.data.data;
    }

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

    async function SwalAddorUpdate(data, id) {
        let isCanceled = false;

        let applicant = {
            firstName: '',
            lastName: '',
            email: '',
            about: '',
            nationalIdentity: '',
            password: '',
            confirmPassword: '',
            dateOfBirth: ''
        };

        const steps = ['1', '2'];
        const Queue = Swal.mixin({
            progressSteps: steps,
            confirmButtonText: 'Next &rarr;',
            showClass: {backdrop: 'swal2-noanimation'},
            hideClass: {backdrop: 'swal2-noanimation'}
        });

        function setApplicantInformationFromFirstPage() {
            applicant.firstName = document.getElementById('first-name').value;
            applicant.lastName = document.getElementById('last-name').value;
            applicant.email = document.getElementById('email').value;
            applicant.about = document.getElementById('about').value;
        }

        function setApplicantInformationFromSecondPage() {
            applicant.nationalIdentity = document.getElementById('national-identity').value;
            applicant.password = document.getElementById('password').value;
            applicant.confirmPassword = document.getElementById('confirm-password').value;
            applicant.dateOfBirth = document.getElementById('date').value;
        }

        function getFirstPageInputElements() {
            return '<input placeholder="First Name" type="text" class="swal2-input" id="first-name" value="' + (data?.firstName || '') + '" />' +
                '<input placeholder="Last Name" type="text" class="swal2-input" id="last-name" value="' + (data?.lastName || '') + '"/>' +
                '<input placeholder="Email" type="email" class="swal2-input" id="email" value="' + (data?.email || '') + '"/>' +
                '<textarea maxlength="100" placeholder="Some text about who you are.." ' +
                'type="text" class="swal2-input" id="about" ' +
                'style="resize: none;width: 261.375px;height: 170px;padding-top: 10px;" >' + (data?.about || '') + '</textarea>';
        }

        function getSecondPageInputElements() {
            return '<input placeholder="Date of Birth" type="date" class="swal2-input" id="date" style="width: 261.375px;" value="' + (data?.dateOfBirth || '') + '" />' +
                '<input placeholder="National Identity" type="text" class="swal2-input" id="national-identity" value="' + (data?.nationalIdentity || '') + '" />' +
                '<input placeholder="Password" type="password" class="swal2-input" id="password" />' +
                '<input placeholder="Confirm Password" type="password" class="swal2-input" id="confirm-password" />';
        }

        await Queue.fire({
            title: data == undefined ? 'Add Applicant 1/2' : 'Update Applicant 1/2',
            currentProgressStep: 0,
            allowOutsideClick: false,
            allowEscapeKey: false,
            focusConfirm: false,
            showCancelButton: true,
            showClass: {backdrop: 'swal2-noanimation'},
            html: getFirstPageInputElements(),
            preConfirm: () => {
                checkIfAllInputsValid();
                checkIfFirstNameValid();
                checkIfLastNameValid();
                checkIfEmailValid();
                checkIfAboutValid();
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setApplicantInformationFromFirstPage();
            }

            isCanceled = result.dismiss === Swal.DismissReason.cancel;
        });

        if (isCanceled) return;

        await Queue.fire({
            title: data == undefined ? 'Add Applicant 2/2' : 'Update Applicant 2/2',
            currentProgressStep: 1,
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: 'Submit',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            focusConfirm: false,
            html: getSecondPageInputElements(),
            preConfirm: () => {
                checkIfAllInputsValid();
                checkIfNationalIdentityValid();
                checkIfPasswordValid();
                checkIfPasswordsMatch();
                checkIfDateOfBirthValid();
                // checkIfNationalIdentityChange(data);
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setApplicantInformationFromSecondPage();
                if (data == undefined) {
                    addApplicant(applicant);
                } else {
                    checkIfAnyChangesAreMade(data, applicant) ? isCanceled = true : isCanceled = false;
                    if (isCanceled) return;
                    updateApplicant(applicant, id);
                }
            }
        });
    }

    useEffect(() => {
        applicantService.getAll().then(result => setApplicants(result.data.data));
    }, []);

    function addApplicant(applicant) {
        applicantService.add(applicant).then(result => {
            if (result.success) {
                displaySuccessAlert(result.message, 'success');
                applicantService.getAll().then(result => setApplicants(result.data.data));
            } else {
                displayErrorAlert(result, getHtml);
            }
        });
    }

    function updateApplicant(applicant, id) {
        applicantService.updateApplicant(applicant, id).then(result => {
            if (result.success) {
                displaySuccessAlert(result.message, 'success');
                applicantService.getAll().then(result => setApplicants(result.data.data));
            } else {
                displayErrorAlert(result, getHtml);
            }
        });
    }

    function deleteApplicant(id) {
        applicantService.delete(id).then(result => {
            if (typeof result === 'string') {
                displaySuccessAlert(result, 'success');
                applicantService.getAll().then(result => setApplicants(result.data.data));
            } else {
                applicantService.removeAnApplicant(id).then(result => {
                    console.clear();
                    if (typeof result === 'string') {
                        displaySuccessAlert(result, 'success');
                        applicantService.getAll().then(result => setApplicants(result.data.data));
                    }
                });
            }
        });
    }

    return (
        <div>
            <div className="overflow-x-auto relative rounded-2xl">
                <h1 className="text-3xl font-bold text-gray-700 mb-2">Applicants Table</h1>
                <button onClick={() => { SwalAddorUpdate(); }}
                        className={'flex bg-green-600 text-xl text-white rounded-3xl p-3 mb-2'}>
                    Add Applicant
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         fill="currentColor"
                         className="w-7 h-7 ml-2">
                        <path fillRule="evenodd"
                              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
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
                                About
                            </th>
                            <th scope="col" className="py-3 px-6">
                                National Identity
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Date of Birth
                            </th>
                            <th scope="col" className="py-3 px-6">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicants.map((applicant) => (
                            <tr key={applicant.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="py-3 px-6">
                                    {applicant.firstName}
                                </td>
                                <td className="py-3 px-6">
                                    {applicant.lastName}
                                </td>
                                <td className="py-3 px-6">
                                    {applicant.email}
                                </td>
                                <td className="py-3 px-6">
                                    {applicant.about}
                                </td>
                                <td className="py-3 px-6">
                                    {applicant.nationalIdentity}
                                </td>
                                <td className="py-3 px-6">
                                    {applicant.dateOfBirth}
                                </td>
                                <td className={'p-3'}>
                                    <button onClick={() => SwalAddorUpdate(applicant, applicant.id)}
                                            className={'bg-blue-600 text-gray-300 mr-1 p-1 rounded-xl'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                             fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd"
                                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </button>
                                    <span className={'text-2xl'} style={{position: 'relative', top: '-4px'}}>|</span>
                                    <button onClick={() => deleteConfirm(applicant)}
                                            className={'bg-red-800 text-gray-300 ml-1 p-1 rounded-xl'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                             fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd"
                                                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                                  clipRule="evenodd"/>
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