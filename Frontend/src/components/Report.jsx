import React, { useEffect, useState } from 'react'
import {Bar,Pie} from 'react-chartjs-2'
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend} from 'chart.js'


ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)
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

      fetch('http://localhost:5000/all-feedbacks')
      .then(res=> res.json())
      .then(data=> setFeedbackList(data))
      .catch(err => console.error(err));
    }
  }, [authenticated])

  //showing data on bar char
  const barChartData={
    labels:reportData.map(item => item._id),
    datasets:[{
      label:"Average Rating",
      data:reportData.map(item => item.averageRating.toFixed(2)),
      backgroundColor:'rgba(50,130,246,0.8)',
    }]
  }

    const barOptions={
    responsive:true,
    maintainAspectRation:false,
    plugins:{
      title:{
        display:true,
        text:'Average Rating per Teacher',
        font:{size:16}
      },
      legend:{display:false}
    },
    scales:{
      y:{beginAtZero:true, max:5, ticks:{stepSize:1}}
    }
  }

  //showing data on pie chart
   const pieChartData={
    labels:reportData.map(item => item._id),
    datasets:[{
      label:"Feedback Count",
      data:reportData.map(item => item.count),
      backgroundColor:[
        '#60a5fa', '#34d399', 'red', 'yellow', 'green', 'blue' 
      ]
    }]
   }  

     const pieOptions={
    responsive:true,
    maintainAspectRation:false,
    plugins:{
      title:{
        display:true,
        text:'Feedback Count per Teacher',
        font:{size:16}
      },
      legend:{position:'right'}
    },
  }

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
          <Bar data={barChartData} options={barOptions}></Bar>
        </div>
        <div className='bg-white rounded shadow p-4 h-[350px]'>
          <Pie data={pieChartData} options={pieOptions}></Pie>
        </div>
      </div>
      <div className='mt-10'>
          <h3 className='text-xl font-bold'>All Feedback with student Info.</h3>
          <div className='overflow-x-auto' /*you will get a scroll bar if data is too much */> 
            <table className='w-full text-sm border'>
              <thead className='bg-blue-100'>
                <tr>
                  <th className='p-2 border'>Student</th>
                  <th className='p-2 border'>Email</th>
                  <th className='p-2 border'>Subject</th>
                  <th className='p-2 border'>Teacher</th>
                  <th className='p-2 border'>Rating</th>
                  <th className='p-2 border'>Comment</th>
                </tr>
              </thead>
              <tbody>
                {feedbackList.map((fb,i)=> (
                  <tr key={i} className='border-b'>
                    <td className='p-2 border'> {fb.studentName || 'Anonymous'} </td>
                    <td className='p-2 border'> {fb.email || 'Hidden'} </td>
                    <td className='p-2 border'> {fb.subject} </td>
                    <td className='p-2 border'> {fb.teacherName} </td>
                    <td className='p-2 border'> {fb.rating} </td>
                    <td className='p-2 border'> {fb.comment} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

export default Report