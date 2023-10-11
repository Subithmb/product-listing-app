import React from "react";
import TextField from "@mui/material/TextField";

function TextFields({name,type,input,value,onChange}) {
  return (
    <div  style={{ marginBottom: "16px" ,marginLeft:'16px'}}>
       
         <TextField id="outlined-basic" label={name}  variant="outlined" className="sm:w-96 w-80 " type={type} value={value} onChange={onChange}/>
        
     
    </div>
  );
}

export default TextFields;