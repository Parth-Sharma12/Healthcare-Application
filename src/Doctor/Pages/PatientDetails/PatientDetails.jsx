import React, { useEffect,useState} from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import Navbar from '../../Components/Navbar/Navbar';
export default function PatientDetails() {
    const { t, i18n } = useTranslation();
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const selectedLanguage = localStorage.getItem('selectedLanguage');
        if (selectedLanguage) {
            i18n.changeLanguage(selectedLanguage);
        }
        try {
            const authToken = JSON.parse(localStorage.getItem("authToken"));
            const token = authToken ? authToken.accessToken : '';
            const userId = parseInt(authToken.userId);
            const response = await axios.get(`http://localhost:8082/api/appointment/doctor-appointments/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json',
                }
            });
            console.log(response.data);
            const extractedAppointments = response.data.map((Appointment, index) => ({
                id: index + 1,
                fullName: `${Appointment.firstName || ''} ${Appointment.middleName || ''} ${Appointment.lastName || ''}`,
                gender: Appointment.gender,
                date: Appointment.date,
                start_time: Appointment.startTime,
                end_time: Appointment.endTime,
                age: Appointment.age,
                description: Appointment.description
            }));
            console.log(extractedAppointments);
            setAppointments(extractedAppointments);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };
    const columns = [
        {
            field: 'fullName',
            headerName: 'Full Name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 140,
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',

            width: 130,
        },
        { field: 'gender', headerName: 'Gender', width: 130 },
        { field: 'date', headerName: 'Date', width: 130 },
        { field: 'start_time', headerName: 'Start Time', width: 130 },
        { field: 'end_time', headerName: 'End Time', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
    ];
    return (
        <>
        <Navbar/>
        <div className="appointment-table" style={{marginTop:'100px'}}>
            <div className='appointmentgrid'>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={appointments}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                    />
                </div>
            </div>
        </div>
        </>
    )
}
