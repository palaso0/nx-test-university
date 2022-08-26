import gql from "graphql-tag";

export const GET_TODOS = gql`
  {
    studentMany {
    ci
    name
    lastName
    career
    photo
  }
  }
`;