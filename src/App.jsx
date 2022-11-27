import './App.css';
import Applicant from './views/Applicant.jsx';
import Employee from './views/Employee';
import Instructor from './views/Instructor';
import Bootcamp from './views/Bootcamp';

function App() {
    return (
        <div className='App'>
            <Applicant></Applicant>
            <Employee></Employee>
            <Instructor></Instructor>
            <Bootcamp></Bootcamp>
        </div>
    );
}

export default App;
