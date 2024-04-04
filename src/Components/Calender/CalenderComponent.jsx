import {React,useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import dayjs from 'dayjs'
import '../Calender/CalenderComponent.css'
export default function CalenderComponent({onDateSelect}) {
    const orangeDates = ['2024-04-01', '2024-04-05', '2024-04-15'].map(date => new Date(date));
    const [selectedDate, setSelectedDate] = useState(null);
    const onClickDay = (date) => {
      const formattedDate = formatDateToYYYYMMDD(date);
      console.log("Selected date:", formattedDate);
      setSelectedDate(formattedDate);
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
              // Check if the date is in the orangeDates array
              return orangeDates.some(d => dayjs(d).isSame(date, 'day')) ? 'orange-date' : null;
            }}
        />
    </>
  )
}
