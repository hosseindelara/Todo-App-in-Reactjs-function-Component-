import React from 'react'
export default function CalendarShamsi(props) {
    
    let DateOut='';
   if(props.DateObjct) DateOut = props.DateObjct.year +'/'+ props.DateObjct.month+ '/' +props.DateObjct.day

return (<p>{DateOut}</p>)
}

