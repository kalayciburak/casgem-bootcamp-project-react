import displayWarningAlert from '../../utils/swal/displayWarningAlert.js';

export default function checkIfAnyChangesAreMade(data, applicant) {
    if (data.firstName === applicant.firstName &&
        data.lastName === applicant.lastName &&
        data.email === applicant.email &&
        data.about === applicant.about &&
        data.nationalIdentity === applicant.nationalIdentity &&
        data.dateOfBirth === applicant.dateOfBirth) {
        displayWarningAlert('No changes were made!');
        return true;
    }
}