// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { StudentCard } from '../components/StudentCard';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../app/store';
import { useEffect } from 'react';
import { setStudentList, selectStudentList } from '../slices/student/studentSlice';

export function StudentContainer() {
  const dispatch = useDispatch()
  const studentList = useSelector(selectStudentList).students.studentList

  useEffect(() => {
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
        dispatch(setStudentList(res))
      })
  }, [])

  const students = () => {
    let component = studentList.map((student: any) => {
      return (<StudentCard photo={student.photo}
        name={student.name}
        lastName={student.lastName}
        ci={student.ci}

        career={student.career}
        key={student._id}
        id={student._id}
      />)
    }
    )

    return component
  }

  return (
    <Box sx={{ display: 'flex', gap: '25px', flexWrap: 'wrap' }}>
      {
        students()
      }
      <div />
    </Box>
  );
}

export default StudentContainer;