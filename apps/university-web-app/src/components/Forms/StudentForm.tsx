import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { gql, useMutation } from '@apollo/client';

interface IProps {
    closeModal: () => void
}
export interface IStudentState {
    name: string,
    lastName: string,
    ci: string,
    career: string,
    photo: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
};


export default function Navbar(props:any) {

    const [student,setStudent] = useState({
        name: '',
        lastName: '',
        ci: '',
        career: 'asdf',
        photo: ''
    });

    const saveStudent = () => {
        console.log(student);
        
    }
    const handleChange = (event:any) => {
        // use spread operator
        setStudent({
          ...student,
          [event.target.name]: event.target.value,
        });
      };

    return (
        <Box sx={style} component="form">
            <Typography id="modal-modal-title" variant="h6" component="h2">
                New Student
            </Typography>

            <TextField label="Name" variant="outlined" value={student.name} onChange={handleChange}/>
            <TextField label="Last Name" variant="outlined" required  />
            <TextField label="CI" variant="outlined" required />
            <TextField label="Career" variant="outlined" required />
            <TextField label="Photo" variant="outlined" required  />

            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button variant="outlined" onClick={saveStudent}> Accept </Button>
                <Button color="error" variant="outlined" onClick={props.closeModal}> Cancel </Button>
            </Box>

        </Box>
    )
}