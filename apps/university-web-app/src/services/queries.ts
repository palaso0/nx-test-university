import { response } from "express"
export function getStudents(){
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
      return response
}
