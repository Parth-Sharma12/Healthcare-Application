import React,{useEffect,useState} from 'react'
import '../HomeRightBar/HomeRightBar.css'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { Tooltip, BarChart, CartesianGrid, Bar, PieChart, Pie, FunnelChart, Funnel, LabelList, Legend, XAxis, YAxis, LineChart, Line,Label, ResponsiveContainer } from 'recharts'
export default function HomeRightBar() {
  
  const [data02,setData2] =useState([
    {
      "name": "Patients",
      "value": 3000,
      "fill": "#FFCDEA"
    },
    {
      "name": "Doctors",
      "value": 4567,
      "fill": "#BC7FCD"
    },
    {
      "name": "Moderators",
      "value": 1398,
      "fill": "#FB9AD1"
    },
    {
      "name": "Responders",
      "value": 9800,
      "fill": "#86469C"
    },
    {
      "name": "Senior Doctors",
      "value": 20,
      "fill": "#D6589F"
    },
  ]);
  const data3 = [
    {
      "name": "Patients",
      "uv": 4000,
      "fill":"#D6589F"
    },
    {
      "name": "Doctors",
      "uv": 3000,
      "fill":"#BC7FCD"
    },
    {
      "name": "Moderators",
      "uv": 2000,
      "fill":"#FFCDEA"
    },
    {
      "name": "Responders",
      "uv": 2780,
      "fill":"#BC7FCD"
    },
    {
      "name": "Senior Doctors",
      "uv": 1890,
      "fill":"#FB9AD1"
    },
    {
      "name": "Page F",
      "uv": 2390,
      "fill":"#D895DA"
    },
    {
      "name": "Page G",
      "uv": 3490,
      "fill":"#D875C7"
    }
  ]
  const [data4, setData4] = useState([
    {
      "value": 100,
      "name": "Doctors",
      "fill": "#86469C"
    },
    {
      "value": 80,
      "name": "Patients",
      "fill": "#FB9AD1"
    },
    {
      "value": 50,
      "name": "Senior Doctors",
      "fill": "#BC7FCD"
    },
    {
      "value": 40,
      "name": "Responders",
      "fill": "#D6589F"
    },
    {
      "value": 26,
      "name": "Moderators",
      "fill": "#FFCDEA"
    }
  ]);
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
  //logic to fetch data from backend for charts
  useEffect(() => {
    const fetchData = async () => {
      try {
        //first get the accessToken to pass in header
        const authTokenString = localStorage.getItem('authToken');
        const authToken = JSON.parse(authTokenString);
        const accessToken = authToken.accessToken;
        //make request
        const doctorsResponse = await axios.get('http://192.168.198.236:8082/api/admin/doctors', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const patientResponse = await axios.get('http://192.168.198.236:8082/api/admin/patients', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const moderatorResponse = await axios.get('http://192.168.198.236:8082/api/admin/doctors', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const responderResponse = await axios.get('http://192.168.198.236:8082/api/admin/patients', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        //find total number of doctors and update the data
        const doctorsCount=doctorsResponse.data.length;
        const patientsCount=patientResponse.data.length;
        const moderatorsCount=moderatorResponse.data.length;
        const respondersCount=responderResponse.data.length;
        console.log(moderatorsCount);
        const updatedData4 = data4.map(item => {
          if (item.name === 'Doctors') {
            return { ...item, value: doctorsCount };
          }
          if (item.name === 'Patients') {
            return { ...item, value: patientsCount };
          }
          if (item.name === 'Responders') {
            return { ...item, value: respondersCount };
          }
          if (item.name === 'Moderators') {
            return { ...item, value: moderatorsCount };
          }
          return item;
        });
        setData4(updatedData4);
        const updatedData02 = data02.map(item => {
          if (item.name === 'Doctors') {
            return { ...item, value: doctorsCount };
          }
          if (item.name === 'Patients') {
            return { ...item, value: patientsCount };
          }
          if (item.name === 'Responders') {
            return { ...item, value: respondersCount };
          }
          if (item.name === 'Moderators') {
            return { ...item, value: moderatorsCount };
          }
          return item;
        });
        setData2(updatedData02);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

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
              {/* <PieChart width={730} height={250}>
                <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label>
        </Pie>
              </PieChart> */}
              <ResponsiveContainer >
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data02}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          {/* <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" /> */}
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
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
            <ResponsiveContainer >
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data02}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          {/* <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" /> */}
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className='middleChart'>
          <p className='statistics'>Statistics</p>
          <LineChart width={1100} height={200} data={data5}
              margin={{ top: 5, right: 20, left: 70, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#D20062" />
              <Line type="monotone" dataKey="uv" stroke="#86469C" />
            </LineChart>
        </div>
        <div className='bottomChartContainer'>
          <div className='firstBottomChart'>
            <p className='bottomContainerText'>Your Team Performance this week</p>
            <PieChart width={500} height={250}>
              <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} />
              <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label />
            </PieChart>
          </div>
          <div className='secondBottomChart'>
            <p className='bottomContainerText'>Your Montly interactions</p>
            <FunnelChart width={500} height={250} className='FunnelChartDesign'>
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
        </div>
      </div>
    </div>
  )
}
