import React,{useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from "classnames/bind";
import style from "./edit.module.scss";
import { Form,ButtonToolbar, Button } from 'rsuite';
import "../../styles.css";
const cx = classNames.bind(style);
interface editNewBill{
  title:string,
  amount:number,
  expense_date:string,
}
const EditBill = ():JSX.Element => { 
    const [singlebill,setsinglebill]=React.useState({});
    useEffect(()=>{
        getById();
      },[]);
  const [state,setstate]=React.useState<editNewBill>({
    title:"singlebill.title",
  amount:10,
  expense_date:""
  });

  //use navigate
  const navigate=useNavigate();

  //id of bill for editing
  const id=useParams();
  
 //for handling value of input boxes
  const handleChangeEditBill=(label: string, value: string)=>{  
    const newValue = state[label as keyof editNewBill] === 0 ? parseInt(value) : value;
    console.log(newValue,"new value............")
   setstate({ ...state, [label]: newValue })
  }

 ///function for updating
  const handleSubmit=async(body:{})=>{
    try {
      const response = await fetch(`http://localhost:3001/api/v1/platform/bill/editbill/${id.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      navigate("/")
    } catch (error) {
      console.log(error);
    }  
  }
  
  //function to get single bill bybid
  async  function getById(){
    var res1=await fetch(`http://localhost:3001/api/v1/platform/bill/billbyid/${id.id}`)
    var res2=await res1.json();    
    setstate(res2.bill);
   setsinglebill(res2.bill);
  
   }
  
 return <div className = {cx("body")} >
    <Form layout="horizontal" >
    <Form.Group controlId="name-6">
      
      <Form.Control placeholder='Enter title of bill ' value={state.title}  onChange={(value) => handleChangeEditBill('title',value)} />     
    </Form.Group>
    <Form.Group controlId="name-6">
      
      <Form.Control  placeholder='Enter amount' value={state.amount}onChange={(value) => handleChangeEditBill('amount',value)} type='number'/> 
    </Form.Group>
      <Form.Group controlId="email-6">
        
        <Form.Control  type="date" value={state.expense_date}  onChange={(value) => handleChangeEditBill('expense_date',value)}/>
      </Form.Group>
      
      <Form.Group>
        <ButtonToolbar>
          <Button className={cx("button")} appearance="primary" onClick={()=>handleSubmit(state)}>Edit User</Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>
</div >
};


export default EditBill;

