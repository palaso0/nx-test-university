import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import { REMOVE_STUDENT } from '../Queries/Mutation'
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { refreshStudentsList } from '../slices/student/studentSlice';

interface Props {
  photo: string
  name: string
  lastName: string
  ci: string
  career: string
  id: string
}

export const StudentCard: React.FC<Props> = ({ photo, name, lastName, ci, career, id }) => {
  const [removeStudent] = useMutation(REMOVE_STUDENT, {
    variables: {
      ci: ci,
    }
  })
  const dispatch = useDispatch();


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
            console.log(name);
            console.log(id)
            e.preventDefault(); 
            removeStudent()
            dispatch(refreshStudentsList())
          }} />
        </Box>
      </CardContent>
    </Card >
  );
}

