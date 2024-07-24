import { useState } from "react";
import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
/* type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
 */
export default function MyApp() {
  //   const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <Calendar
        /*  onChange={onChange} value={value} */ className="bg-black text-center text-white w-60 rounded-md shadow-2xl p-3 rounded-t-none"
      />
    </div>
  );
}
