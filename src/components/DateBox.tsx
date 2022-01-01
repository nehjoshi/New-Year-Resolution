import React from 'react'
import "../styles/calender/calender.css";

interface Props {
    month: number,
    day: string,
    date: number,
    bgColor: string
    onClick: (month: number, date: number) => void
}

const DateBox: React.FC<Props> = (Props) => {

    return (
        <div className="datebox-wrapper" onClick={() => Props.onClick(Props.month, Props.date)} style={{backgroundColor: Props.bgColor}}>
            <h5>{Props.day}</h5>
            <h5>{Props.date}</h5>
        </div>
    )
}
export default DateBox;