import { useEffect, useState } from "react";
import "./List.css";
import DB from "./DB";

const List = () => {
  const [list, setList] = useState([]);
  const [item, setItem] = useState({ activity: "" });

  const fetchdata = () => {
    try {
      DB.getFromList()
        .then((res) => {
          setList([...res.data]);
        })
        .catch((err) => {
          console.log("error occured \n" + err);
        });
    } catch (err) {
      console.log("error occured \n" + err);
    }
  };

  const addInList = () => {
    // console.log(item);
    DB.addInList(item)
      .then(() => {
        console.log("added successfully");
        setItem({ activity: "" });
      })
      .catch((err) => {
        console.log("error " + err);
      });
  };

  const deletHandler = (e) => {
    if (e.target.id === "del-btn") {
      const actNo = +e.target.value;
      list.map((itm) => {
        if (itm.act_no === actNo) {
          const row = e.currentTarget.parentNode.parentNode;
          row.querySelector("#activity").setAttribute("class", "strike");
        }
      });
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setItem({ activity: value });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <div className="list-outer-container">
        <div className="list-inner-container">
          <div className="input-elem">
            <form>
              <input id="item" value={item.activity} onChange={handleChange} />
              <button className="btn btn-primary" onClick={addInList}>
                Add
              </button>
            </form>
          </div>
          <div className="output-elem">
            <table align="center" border={1}>
              <thead>
                <tr>
                  <th>Act. No.</th>
                  <th>Activity</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {list.map((ob) => (
                  <tr key={ob.act_no}>
                    <td id="id">{ob.act_no}</td>
                    <td id="activity">{ob.activity}</td>
                    <td>
                      <button
                        value={ob.act_no}
                        className="btn btn-danger"
                        id="del-btn"
                        onClick={deletHandler}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
