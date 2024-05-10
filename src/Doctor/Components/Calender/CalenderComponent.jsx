import {React} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import '../Calender/CalenderComponent.css'
import { useAppointmentContext } from '../../Context/AppointmentContext'
export default function CalenderComponent({onDateSelect}) {
   const { selectedDate } = useAppointmentContext(); // Access selectedDate from context
    const onClickDay = (date) => {
      const formattedDate = formatDateToYYYYMMDD(date);
      console.log("Selected date:", formattedDate);
      onDateSelect(formattedDate);
      };
      function formatDateToYYYYMMDD(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
  return (
    <>
       <Calendar onClickDay={onClickDay} formatDate={(date) => formatDateToYYYYMMDD(date)}
            tileClassName={({ date }) => {
            }}
            value={selectedDate ? new Date(selectedDate) : null}
        />
    </>
  )
}
