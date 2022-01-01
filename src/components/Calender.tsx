import React, { ReactElement, useState } from 'react'
import "../styles/calender/calender.css";
import { ArrowBack, ArrowLeft, ArrowRight } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import DateBox from './DateBox';
import Modal from '@mui/material/Modal';
import { Button } from '@material-ui/core';
import { db } from '../firebase';
import { ref, set, get } from "firebase/database";

const Calender: React.FC = () => {

    const [month, setMonth] = useState(0);
    const [date, setDate] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [bgColors, setBgColors] = useState([""]);

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

    const onClickDay = (month: number, date: number) => {
        console.log(month + " " + date);
        setDate(date);
        setModalOpen(true);
    }

    const GenerateCalender = () => {
        const calender: Array<ReactElement> = [];
        const year: number = 2022;
        let number_of_days: number = 0;
        switch (month) {
            case 0: case 2: case 4: case 6: case 7: case 9: case 11:
                number_of_days = 31;
                break;
            case 3: case 5: case 8: case 10:
                number_of_days = 30;
                break;
            case 1:
                number_of_days = 28;
        }
        const dbRef = ref(db);
        for (let i = 1; i < number_of_days + 1; i++) {
            const day_number: number = new Date(year, month, i).getDay();
            let bgColor: string = "";
            get(ref(db, `resolutionProgress/${i}-${month + 1}`))
                .then(snapshot => {
                    let completed = Object.values(snapshot.val())[0];
                    console.log(completed);
                    if (completed===true) {
                        bgColor="#30c94f";
                    }   
                    else {
                        bgColor="#ff5a5f";
                    }
                })
                .then(() => {
                    console.log("Welcome abroad")
                    switch (day_number) {
                        case 0:
                            calender.push(<DateBox key={i} day="Sunday" month={month + 1} date={i} onClick={onClickDay} bgColor={bgColor}/>);
                            break;
                        case 1:
                            calender.push(<DateBox key={i} day="Monday" month={month + 1} date={i} onClick={onClickDay} bgColor={bgColor}/>);
                            break;
                        case 2:
                            calender.push(<DateBox key={i} day="Tuesday" month={month + 1} date={i} onClick={onClickDay} bgColor={bgColor}/>);
                            break;
                        case 3:
                            calender.push(<DateBox key={i} day="Wednesday" month={month + 1} date={i} onClick={onClickDay} bgColor={bgColor}/>);
                            break;
                        case 4:
                            calender.push(<DateBox key={i} day="Thursday" month={month + 1} date={i} onClick={onClickDay} bgColor={bgColor}/>);
                            break;
                        case 5:
                            calender.push(<DateBox key={i} day="Friday" month={month + 1} date={i} onClick={onClickDay} bgColor={bgColor}/>);
                            break;
                        case 6:
                            calender.push(<DateBox key={i} day="Saturday" month={month + 1} date={i} onClick={onClickDay} bgColor={bgColor}/>);
                            break;
                    }
                })
 

        }
        return calender;
    }
    const submitResolutionCompleted = (completed: boolean) => {
        set(ref(db, `resolutionProgress/${date}-${month + 1}`), {
            completed: completed
        })
            .then(res => setModalOpen(false))
            .catch(err => console.log(err))
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
            <div className="date-wrapper">
                {GenerateCalender()}
            </div>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <div className="modal">
                    <h3>Have you completed ALL your resolutions for the date {date}/{month + 1}/2022?</h3>
                    <div className="modal-button-wrapper">
                        <Button
                            style={{ backgroundColor: '#30c94f', color: "#fff" }}
                            size="large"
                            variant="contained"
                            onClick={() => submitResolutionCompleted(true)}>YES</Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            size="large"
                            onClick={() => submitResolutionCompleted(false)}>NO</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default Calender;