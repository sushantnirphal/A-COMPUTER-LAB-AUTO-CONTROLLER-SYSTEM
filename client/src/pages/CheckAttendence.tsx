import Header from "@/partials/Header";
import React, { useState, useRef } from 'react';
import { useReactToPrint } from "react-to-print";
import { Button } from "semantic-ui-react";
import {useNavigate} from "react-router-dom";




const CheckAttendence = () => {
  
  return (
    
    <div className="h-screen gr-bg">
      <Header />
      <div className="p-12 md:p-32 h-full  overflow-y-auto text-slate-100">
      
      </div>
    </div>
  );
};

export default CheckAttendence;
