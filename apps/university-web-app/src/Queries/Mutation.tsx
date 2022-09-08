import { gql } from '@apollo/client';

export const ADD_STUDENT = gql`
    mutation StudentCreateOne(
        $name: String!
        $lastName:String!
        $ci: String!
        $career: String!
        $photo: String!
    ) {
  studentCreateOne(
    record: {
      name: $name
      lastName: $lastName
      ci: $ci
      career: $career
      photo: $photo
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
`;

export const REMOVE_STUDENT = gql`
  mutation StudentRemoveOne(
    $ci: String!
  ) {
  studentRemoveOne(filter: {
    ci: $ci,
  }) {
    record {
      ci
    }
  }
}
`