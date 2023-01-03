import './App.css';
import Applicant from './views/Applicant.jsx';
import Employee from './views/Employee';
import Instructor from './views/Instructor';
import Bootcamp from './views/Bootcamp';
import GlobalExceptionHandler from './utils/configuration/exceptions/GlobalExceptionHandler.jsx';

function App() {
    return (
        <div className="App">
            <GlobalExceptionHandler/>
            <Applicant></Applicant>
            <Employee></Employee>
            <Instructor></Instructor>
            <Bootcamp></Bootcamp>
        </div>
    );
}

export default App;
