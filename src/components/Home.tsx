import React, { useState } from 'react'
import "../styles/global/global.css";
import "../styles/home/home.css";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { db } from '../firebase';
import { ref, set, get } from "firebase/database";

const Home: React.FC = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [text, setText] = useState("");

    const HandleSubmit = () => {

        let length = 0;

        const dbRef = ref(db);
        get(dbRef).then(snapshot => {
            if (snapshot.val()){
             console.log(Object.keys(snapshot.val().resolutions).length) 
             length = Object.keys(snapshot.val().resolutions).length;
             set(ref(db, `resolutions/res${length}`), {
                res: text
            })
            .then(res => console.log("Success"))
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


    return (
        <div className="wrapper">
            <div className="container">
                <h1>New Year Resolution Generator</h1>
                <p>For the year 2022</p>
                <div className='button-container'>
                    <Button variant="contained" onClick={handleOpen} className="button" size="large" color="primary" style={{ backgroundColor: '#FF7F11' }}>Create new Resolution</Button>
                    <Button variant="contained" size="large" color="primary" style={{ backgroundColor: '#725AC1' }}>View All Resolutions</Button>
                </div>
            </div>
            <Modal open={open} onClose={handleClose}>
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
        </div>
    )
}
export default Home;
