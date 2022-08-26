// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import StudentContainer from '../components/StudentContainer';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});




export function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <StudentContainer />
      </ApolloProvider>

      <div />
    </>
  );
}

export default App;
