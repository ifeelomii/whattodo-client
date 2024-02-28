import { useEffect, useState } from "react";
import "./List.css";
import DB from "./DB";

const List = () => {

  const [list,setList] = useState([])
  const [item, setItem] = useState('')

  const fetchdata = () => {
    try {
      DB.getFromList()
        .then((res) => {
          setList([...res.data])
        })
        .catch((err) => {
          console.log("error occured \n" + err)
        })
    }
    catch (err) {
      console.log("error occured \n"+err)
    }
  }

  const addInList = async (item) => {
    let res = await DB.addToList(item);
  }
  
  const deletHandler = () => {
    document.getElementById("activity").setAttribute('class','strike');
    // console.log(id);
  }
  const editHandler = () => {
    console.log("edit")
  }

  useEffect(()=>{
    fetchdata()
  }, []);
  
  

  return (
    <>
      <div className="list-container">
        <div className="input-elem">
          <input id="item"
            onChange={(e) => { setItem(e.target.value) }} />
          <button className="btn btn-primary" onClick={addInList}>Add</button>
        </div>
        <div className="output-elem">
          <table align="center" border={1}>
            <thead>
              <tr>
                <th>Act. No.</th>
                <th>Activity</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>{list.map((ob) => (
              <tr key={ob.act_no}>
                <td id="id">{ob.act_no}</td>
                <td id="activity">{ob.activity}</td>
                <td><button className="btn btn-danger" id="del-btn" onClick={deletHandler}>Delete</button></td>
                <td><button className="btn btn-info" id="edit-btn" onClick={editHandler}>Edit</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default List;
