import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setStudentList } from '../slices/student/studentSlice';

interface Props {
  photo: string
  name: string
  lastName: string
  ci: string
  career: string
  id: string
}

export const StudentCard: React.FC<Props> = ({ photo, name, lastName, ci, career, id }) => {
  const dispatch = useDispatch();

  function removeStudent() {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `
        mutation StudentRemoveOne {
          studentRemoveOne(filter: {
            _id: "${id}",
          }) {
            record {
              _id
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


  return (
    < Card sx={{ maxWidth: 200 }
    }>
      <CardMedia
        component="img"
        height="140"
        image={photo}
        alt="Not Found"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name} {lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          CI: {ci}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Career: {career}
        </Typography>

        <Box sx={{ with: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Button startIcon={<EditIcon />} />
          <Button startIcon={<DeleteIcon />} onClick={(e) => {
            e.preventDefault();
            removeStudent()
          }} />
        </Box>
      </CardContent>
    </Card >
  );
}

