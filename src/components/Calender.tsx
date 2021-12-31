import React, { useState } from 'react'
import "../styles/calender/calender.css";
import { ArrowBack, ArrowLeft, ArrowRight } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const Calender: React.FC = () => {

    const [month, setMonth] = useState(0);

    const monthGenerator = () => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[month];
    }
    const handleMonthBack = () => {
        if (month === 0) {
            setMonth(11);
        }
        else {
            setMonth(month - 1);
        }
    }
    const handleMonthForward = () => {
        if (month === 11) {
            setMonth(0);
        }
        else {
            setMonth(month + 1);
        }
    }

    return (
        <div className='calender-wrapper'>
            <nav>
                <h2>Calender</h2>
                <Link to="/"><div className="back-wrapper">
                    <ArrowBack className="back-icon" />
                </div></Link>
            </nav>
            <div className="month-wrapper">
                <div className="month-arrow-wrapper" onClick={handleMonthBack}>
                    <ArrowLeft className="month-arrow" />
                </div>
                <h6>{monthGenerator()}</h6>
                <div className="month-arrow-wrapper" onClick={handleMonthForward}>
                    <ArrowRight className="month-arrow" />
                </div>
            </div>
        </div>
    )
}
export default Calender;