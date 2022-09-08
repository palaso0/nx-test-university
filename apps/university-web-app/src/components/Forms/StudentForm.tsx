import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { setStudentList,sortStudentList } from '../../slices/student/studentSlice';

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



export default function Navbar(props: any) {
    const [student, setStudent] = useState({
        name: '',
        lastName: '',
        ci: '',
        career: '',
        photo: ''
    });

    const dispatch = useDispatch()

    function addStudent() {
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `
                mutation StudentCreateOne {
                    studentCreateOne(
                      record: {
                        ci: "${student.ci}"
                        name: "${student.name}"
                        lastName: "${student.lastName}"
                        career: "${student.career}"
                        photo: "${student.photo}"
                      }
                    ) {
                      record {
                        ci
                        name
                        lastName
                        career
                        photo
                      }
                    }
                  }                  
              `
            })
        })
            .then(res => res.json())
            .then(res => {
                fetch('http://localhost:4000/graphql', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        query: `{
              getStudents {
                  _id
                  name
                  lastName
                  career
                  ci
                  photo
                }
          }`
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res.data.getStudents);
                        dispatch(setStudentList(res))
                    })
            })
    }


    const handleChange = (event: any) => {
        setStudent({
            ...student,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Box sx={style} component="form" >
            <Typography id="modal-modal-title" variant="h6" component="h2">
                New Student
            </Typography>

            <TextField label="Name" variant="outlined" name="name" onChange={handleChange} />
            <TextField label="Last Name" variant="outlined" required name="lastName" onChange={handleChange} />
            <TextField label="CI" variant="outlined" required name="ci" onChange={handleChange} />
            <TextField label="Career" variant="outlined" required name="career" onChange={handleChange} />
            <TextField label="Photo" variant="outlined" required name="photo" onChange={handleChange} />

            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button variant="outlined" onClick={(e) => {
                    e.preventDefault();
                    addStudent()
                    props.closeModal();
                }}> Accept </Button>
                <Button color="error" variant="outlined" onClick={props.closeModal}> Cancel </Button>
            </Box>
        </Box >
    )
}