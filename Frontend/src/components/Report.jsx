import React, { useEffect, useState } from 'react'
import {Bar,Pie} from 'react-chartjs-2'
import {Chart as ChartJS, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend} from 'chart.js'


ChartJS.register(LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)
const Report = () => {

  const [reportData, setReportData] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('')

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD
  console.log('loaded password',ADMIN_PASSWORD);

  const handleSubmit= ()=>{
    if(enteredPassword === ADMIN_PASSWORD){
      setAuthenticated(true);
    }else{
      alert('Incorrect Password !')
    }
  }

  //to update and show data without reloading the page
  useEffect(()=>{
    if(authenticated){
      fetch('http://localhost:5000/feedback-report')
      .then(res=> res.json())
      .then(data=> setReportData(data))
      .catch(err => console.error(err));
    }
  }, [authenticated])

  if(!authenticated){
    return(
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
        <div className='bg-white shadow-lg rounded p-6 w-full max-w-md text-center'>
          <h2 className='text-2xl font-bold mb-4'>Admin Access</h2>
          <input type="password" placeholder='Enter admin password'
          value={enteredPassword}
          onChange={(e)=>setEnteredPassword(e.target.value)}
          className='border border-gray-300 rounded p-2 w-full mb-4'
          > </input>
          <button className='bg-blue-600 text-white- px-4 py-2 rounded' onClick={handleSubmit}>Login</button>
        </div>
      </div>
    )
  }


  return (
    <div className='max-w-6xl p-4'>
      <h2 className='text-2xl  font-bold text-center'>Admin Feedback Report</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className='bg-white rounded shadow p-4 h-[350px]'>

        </div>
      </div>
    </div>
  )
}

export default Report