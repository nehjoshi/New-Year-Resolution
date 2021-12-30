import React, { useState, useEffect } from 'react'
import "../styles/global/global.css";
import "../styles/home/home.css";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { db } from '../firebase';
import { ref, set, get } from "firebase/database";

const Home = () => {

    const [open1, setOpen1] = useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const [text, setText] = useState("");
    const [resolutions, setResolutions] = useState({});

    useEffect(() => {
        const dbRef = ref(db);
        get(dbRef).then(snapshot => {
            if (snapshot.val()) {
                setResolutions(snapshot.val().resolutions);
            }

        })
    }, [])

    const HandleSubmit = () => {

        let length = 0;

        const dbRef = ref(db);
        get(dbRef).then(snapshot => {
            if (snapshot.val()) {
                length = Object.keys(snapshot.val().resolutions).length;
                set(ref(db, `resolutions/res${length}`), {
                    res: text
                })
                    .then(res => {
                        setOpen1(false);
                        get(dbRef).then(snapshot => {
                            setResolutions(snapshot.val().resolutions);
                        })

                    })
                    .catch(err => console.log(err));
            }
            else {
                set(ref(db, `resolutions/res0`), {
                    res: text
                })
                    .then(res => console.log("Success"))
                    .catch(err => console.log(err));
            }
        })

    }

    const PrintResolutions = () => {
        const output = []

        const x1 = Object.values(resolutions);
        for (let i = 0; i < x1.length; i++) {
            output.push(
                <div className="item-wrapper">
                    <p key={i} className="item">{x1[i].res}</p>
                </div>)
        }

        return output;

    }

    return (
        <div className="wrapper">
            <div className="container">
                <h1>New Year Resolution Generator</h1>
                <p>For the year 2022</p>
                <div className='button-container'>
                    <Button variant="contained" onClick={handleOpen1} className="button" size="large" color="primary" style={{ backgroundColor: '#FF7F11' }}>Create new Resolution</Button>
                    <Button variant="contained" onClick={handleOpen2} size="large" color="primary" style={{ backgroundColor: '#725AC1' }}>View All Resolutions</Button>
                </div>
            </div>
            <Modal open={open1} onClose={handleClose1}>
                <div className="modal">
                    <h2>Create A New Resolution</h2>
                    <TextField
                        id="outlined-multiline-static"
                        label="E.g. I will quit smoking..."
                        multiline
                        rows={4}
                        placeholder="Enter your resolution here"
                        className="input"
                        onChange={e => setText(e.target.value)}
                    />
                    <Button variant="contained" className="button" size="large" color="primary" onClick={HandleSubmit}>Create</Button>
                </div>
            </Modal>

            <Modal open={open2} onClose={handleClose2}>
                <div className="modal">
                    <h2>Your Resolutions for 2022</h2>
                    <div className="resolutions">
                        {open2 && PrintResolutions()}
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default Home;
