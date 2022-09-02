// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { StudentCard } from '../components/StudentCard';
import { gql, useQuery } from '@apollo/client';
import { Box } from '@mui/system';
const GET_STUDENTS = gql`
query{
  getStudents {
    _id
    name
    lastName
    career
    photo
    ci
  } 
}
`

export function StudentContainer() {
  const { loading, error, data } = useQuery(GET_STUDENTS)



  const students = () => {
    let component;
    if (loading) {
      console.log('Cargando');
      return (<h1>Cargando</h1>)
    }
    else {
      console.log('Componentes listos ')

      component = data.getStudents.map((student: any) => {
        return (<StudentCard photo={student.photo}
          name={student.name}
          lastName={student.lastName}
          ci={student.ci}
          career={student.career}
          key={student._id}
        />)
      })
    }
    if (error) {
      console.log(error)
      return <h1>Error</h1>
    }
    return component
  }

  return (
    <Box sx={{ display: 'flex', gap: '25px' }}>

      {
        students()
      }

      <div />
    </Box>
  );
}

export default StudentContainer;