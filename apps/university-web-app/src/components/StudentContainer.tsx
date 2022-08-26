// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { StudentCard } from '../components/StudentCard';





export function StudentContainer() {
  return (
    <>
      <StudentCard photo="https://www.purina-latam.com/sites/g/files/auxxlc391/files/styles/social_share_large/public/Purina%C2%AE%20Como%20disciplinar%20a%20tu%20gato.jpg?itok=V7Gs6wt3"   
        name= "Lionel"
        lastName="Messi"
        ci= "123"
        career= "Mecaa"
      />
      <div />
    </>
  );
}

export default StudentContainer;