import React from 'react'
import '../HomeRightBar/HomeRightBar.css'
import Navbar from '../Navbar/Navbar'
import { Tooltip, BarChart, CartesianGrid, Bar, PieChart, Pie, FunnelChart, Funnel, LabelList, Legend, XAxis, YAxis, LineChart, Line } from 'recharts'
export default function HomeRightBar() {
  
  const data02 = [
    {
      "name": "Group A",
      "value": 3000,
      "fill": "#FF407D"
    },
    {
      "name": "Group B",
      "value": 4567,
      "fill": "#40679E"
    },
    {
      "name": "Group C",
      "value": 1398,
      "fill": "#FFCAD4"
    },
    {
      "name": "Group D",
      "value": 9800,
      "fill": "#1B3C73"
    },
    {
      "name": "Group E",
      "value": 3908,
      "fill": "#F5DD61"
    },
  ];
  const data3 = [
    {
      "name": "Page A",
      "uv": 4000
    },
    {
      "name": "Page B",
      "uv": 3000
    },
    {
      "name": "Page C",
      "uv": 2000
    },
    {
      "name": "Page D",
      "uv": 2780
    },
    {
      "name": "Page E",
      "uv": 1890
    },
    {
      "name": "Page F",
      "uv": 2390
    },
    {
      "name": "Page G",
      "uv": 3490
    }
  ]
  const data4 = [
    {
      "value": 100,
      "name": "Doctors",
      "fill": "#59D5E0"
    },
    {
      "value": 80,
      "name": "Patients",
      "fill": "#F5DD61"
    },
    {
      "value": 50,
      "name": "Senior Doctors",
      "fill": "#F4538A"
    },
    {
      "value": 40,
      "name": "Responders",
      "fill": "#FAA300"
    },
    {
      "value": 26,
      "name": "Moderators",
      "fill": "#a4de6c"
    }
  ]
  const data5 = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    }
  ]

  return (
    <div className='mainHomeRightbar'>
      <Navbar />
      <div>
        <div className='itemContainer'>
          <div className='itemContainer1'>
            <div className='subItemContainer'>
              <p className='taskProgress'>Doctors</p>
              <p className='taskCounter1'>115</p>
              <p className='currentMonth1'>Current Month</p>
            </div>
            <div className='pieChartContainer'>
              <PieChart width={730} height={250}>
                <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
              </PieChart>
            </div>
          </div>
          <div className='itemContainer1'>
            <div className='subItemContainer'>
              <p className='taskProgress'>Moderators</p>
              <p className='taskCounter2'>115</p>
              <p className='currentMonth1'>Current Month</p>
            </div>
            <div className='barChartContainer'>
              <BarChart width={180} height={100} data={data3}>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </div>
          </div>
          <div className='itemContainer1'>
            <div className='subItemContainer'>
              <p className='taskProgress'>Patients</p>
              <p className='taskCounter3'>200</p>
              <p className='currentMonth1'>Current Month</p>
            </div>
            <div className='pieChartContainer'>
              <PieChart width={730} height={250}>
                <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label />
              </PieChart>
            </div>
          </div>
        </div>
        <div className='middleChart'>
          <p className='statistics'>Statistics</p>
          <FunnelChart width={800} height={200} className='FunnelChartDesign'>
            <Tooltip />
            <Funnel
              dataKey="value"
              data={data4}
              isAnimationActive
            >
              <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
            </Funnel>
          </FunnelChart>
        </div>
        <div className='bottomChartContainer'>
          <div className='firstBottomChart'>
            <p className='bottomContainerText'>Your Team Performance this week</p>
            <PieChart width={500} height={250}>
              <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
              <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
            </PieChart>
          </div>
          <div className='secondBottomChart'>
            <p className='bottomContainerText'>Your Montly interactions</p>
            <LineChart width={690} height={200} data={data5}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  )
}
