import './App.css';
import {useState} from "react";
import Axios from 'axios';

function App() {
  const [company,setCompany]=useState("Company A");
  const [category,setCategory]=useState("Enquiry");
  const [status,setStatus]=useState("In Progess");
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [solution,setSolution]=useState("");

  const [ticketList,setTicketList]=useState([]);

  const addTicket=()=>{
    Axios.post("https://supportwebsite.herokuapp.com/create", {
      company:company,
      category:category,
      status:status,
      title:title,
      description:description,
      solution:solution
    }).then((response)=>{
      setTicketList([...ticketList,{
        company:company,
        category:category,
        status:status,
        title:title,
        description:description,
        solution:solution
      }])
    });
  };

  const getTicket=()=>{
    Axios.get("https://supportwebsite.herokuapp.com//ticket").then((response)=>{
      setTicketList(response.data);
    });
  };

  return (    
    <div className="App">
      <div className="Information">
        {/*Company Name*/}
        <label>Company Name: </label>
        <select 
          name="company" 
          id="company"
          onChange={
            (event)=>{
              setCompany(event.target.value);
            }}
          >
          <option value="Company A">Company A</option>
          <option value="Company B">Company B</option>
          <option value="Company C">Company C</option>
        </select>

        {/*Category*/}
        <label>Ticket Category: </label>
        <select 
          name="category" 
          id="category"
          onChange={
            (event)=>{
              setCategory(event.target.value);
            }}
          >
          <option value="Enquiry">Enquiry</option>
          <option value="Bug">Bug</option>
          <option value="Enhancement">Enhancement</option>
        </select>

        {/*Status*/}
        <label>Status: </label>
        <select 
          name="status" 
          id="status"
          onChange={
            (event)=>{
              setStatus(event.target.value);
            }}
          >
          <option value="In Progress">In Progress</option>
          <option value="Pending Respond">Pending Customer Respond</option>
          <option value="Close">Close</option>
        </select>
        
        {/*Title*/}
        <label>Title: </label>
        <textarea 
          type="text"
          onChange={
            (event)=>{
              setTitle(event.target.value);
            }}
        />

        {/*Description*/}
        <label>Description: </label>
        <textarea 
          type="text"
          onChange={
            (event)=>{
              setDescription(event.target.value);
            }}
        />

        {/*Solution*/}
        <label>Solution: </label>
        <textarea 
          type="text"
          onChange={
            (event)=>{
              setSolution(event.target.value);
            }}
        />

        {/*Create ricket button*/}
        <button onClick={addTicket}>Create Ticket</button>
      </div>
      <hr></hr>
      <div className="tickets">
        {/*Show tickets*/}
        <button onClick={getTicket}>Show Ticket</button>

        <table className="ticketList">
          <tr>
            <th> T/No.</th>
            <th> Company Name.</th>
            <th> Category</th>
            <th> Status</th>
            <th> Title</th>
          </tr>
          {ticketList.map((val,key)=>{
          return<tr>
            <td>T{val.ticketid}</td>
            <td>{val.company}</td>
            <td>{val.category}</td>
            <td>{val.status}</td>
            <td>{val.title}</td>
          </tr>})}
        </table>
      </div>
    </div>
  );
}

export default App;
