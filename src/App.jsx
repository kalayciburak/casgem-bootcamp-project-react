import { useState } from 'react';
import './App.css';
import Applicant from './views/Applicant.jsx';
import Employee from './views/Employee';
import Instructor from './views/Instructor';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className='App'>

            <Applicant></Applicant>
            <Employee></Employee>
            <Instructor></Instructor>
        </div>
    );
}

export default App;
