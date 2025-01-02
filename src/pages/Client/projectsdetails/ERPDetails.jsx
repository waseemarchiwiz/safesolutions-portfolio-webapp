import React from 'react'
import { useParams } from "react-router";

const ERPDetails = () => {
  let params = useParams();
  console.log(params, "useParams");
  
  
  return <ERPDetails data={params.data} />
}

export default ERPDetails