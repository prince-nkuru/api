import { useState, useEffect } from "react";
import "./App.css";
import { getList, setItem } from "../../services/list";

function App() {
  const [alert, setAlert] = useState(false);
  const [itemInput, setItemInput] = useState('');
  const [list, setList] = useState([]);
  console.log(getList);
  useEffect(() => {
    let mounted = true;
    if (list.length && !alert){      /*this is for refreshing the list*/
      return;
    }
    getList().then((item) => {
      if (mounted) {
        setList(item);
      }
    });
    return () => (mounted = false);
  }, [alert, list]);


  /*to display alert message for one second run this effect*/
  useEffect(() => {
    if(alert) {
    setTimeout(() => {
    setAlert(false);
    }, 1000)
    }
   }, [alert])

  const handleSubmit = (e) => {
    e.preventDefault();
    setItem(itemInput)
           .then(() => {
            setItemInput('');
            setAlert(true);
           })
   };

  return (
    <div className="wrapper">
      <h1 className="">My Grocery List</h1>
      <ul>
        {list.map((item) => (
          <li key={item.item}>{item.item}</li>
        ))}
      </ul>
         {alert && <h2>submit succeful</h2>}
      <form onSubmit={handleSubmit}>
        <label>
          <p>New Item</p>
          <input type="text" onChange={event => setItemInput(event.target.value)} value={itemInput} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

/*
steps of creating local api

1 npm install --save-dev json-server
2 nano db.json
3 "list": [
 { "id": 1, "item": "bread" },
 { "id": 2, "item": "grapes" }
 ]

 4 nano package.json
5 add "api": "json-server db.json -p 3333 --delay 1500" to the scripts,
6 npm run api

if you want to add to the list , use the below command



Breakdown of the Command
-d '{"item":"rice"}': This specifies the data you want to send in the request.
-H 'Content-Type: application/json': This sets the content type of the request to JSON.
-X POST: This specifies that you want to perform a POST request.
http://localhost:3333/list: This is the endpoint you're sending the request to.*/
