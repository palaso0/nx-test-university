import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {gql} from '@apollo/client';

interface Props {
  photo: string
  name: string
  lastName: string
  ci: string
  career: string
}


export const StudentCard: React.FC<Props> = ({ photo, name, lastName, ci, career }) => {
  return (
    
      <Card sx={{ maxWidth: 200 }}>
        <CardMedia
          component="img"
          height="140"
          image={photo}
          alt="green iguana"
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

        </CardContent>
      </Card>
  );
}

