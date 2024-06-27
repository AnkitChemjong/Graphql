import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {gql,useQuery} from "@apollo/client"
import viteLogo from '/vite.svg'
import './App.css'

const query=gql`
query getTodosWithUser{
  getTodos{
    id
    title
    completed
    user{
      id
      name
    }
  }
}`


function App() {
  const {data,loading}=useQuery(query);
  if(loading) return <h1>Loading...</h1>;
  else{

    return (
      <div>
    {JSON.stringify(data)}
    <table>
      <tbody>
         {
          data.getTodos.map((d)=>{
               <tr key={d.id}>
                 <td>{d.title}</td> 
                 <td>{d?.user?.name}</td> 
               </tr>
          })
         }
      </tbody>
    </table>
    </div>);
        }
}

export default App
