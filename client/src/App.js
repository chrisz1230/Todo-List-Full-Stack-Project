import Navbar from "./components/Navbar"
import Form from "./components/Form"
import List from "./components/List"
import { useState } from "react"

export default function App () {

    const [items, setItems] = useState([]) 

    const addItem = (item) => setItems([...items, item])

    const deleteItem = async(item) => {
        if(window.confirm("Delete This Item?")) {
          try {
            const id = item.id;
            const response = await fetch("http://localhost:5000/todos/"+id, {
              method: "DELETE"
            });
          } catch (err) {
            console.error(err.message);
          }
          setItems(items.filter((current) => current.id !== item.id))
        }
    }

    const editItem = async(item) => {
        const input = window.prompt("Upate Test:", item.text)
        if (input){
          try {
            const body = {description : input};
            const id = item.id;
            const response = await fetch("http://localhost:5000/todos/"+id, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
             console.log(input);
          } catch (err) {
            console.error(err.message);
          }
           setItems(items.map((current) => (current.id === item.id) ? {...current, text : input}: current))
        }
    }

    const clearItems = async () => {
      if (window.confirm("Are you sure you want to clear all items? This action cannot be undone.")) {
        try {
          const response = await fetch("http://localhost:5000/todos", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          console.error("Error clearing items:", err.message);
        }
        setItems([]); 
      }
    }

    const moveTaskUp = (item) => {
        const index = items.indexOf(item);
        if (index > 0) {
            const newItems = [...items];
            [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
            setItems(newItems);
        }
    };

    const moveTaskDown = (item) => {
        const index = items.indexOf(item);
        if (index < items.length - 1) {
            const newItems = [...items];
            [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
            setItems(newItems);
        }
    };
    
    return (
        <div className="wrapper bg-dark text-white">
            <Navbar items={items} clearItems={clearItems}/>
            <div className="container pt-5">
                <div
                    className="col-12 col-lg-6 p-5 mx-auto mt-5 border border-light rounded">
                        <Form addItem={addItem}/>
                        <List items = {items} deleteItem = {deleteItem} editItem={editItem} moveTaskUp={moveTaskUp} moveTaskDown={moveTaskDown}/>
                </div>
            </div>
        </div>
    ) 
}