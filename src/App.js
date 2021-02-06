import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import { WiDaySunny } from "react-icons/wi";
import { TiWeatherNight } from "react-icons/ti";
import img from "./bg-desktop-light.jpg";
import img2 from "./bg-desktop-dark.jpg";
import { IoIosClose } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoIosRadioButtonOff } from "react-icons/io";

const navstyle = {
  color: "grey",
  cursor: "pointer" 
};
const navstyle1 = {
  color: "lightblue",
  cursor: "pointer" 
};
function App() {
  const [todo, setTodo] = useState("");
  const [data, setData] = useState([]);
  const [active, setActive] = useState([]);
  const [day, setDay] = useState(true);
  const [mode, setMode] = useState("black");
  const [grey, setGrey] = useState("#162536");
  const [out, setOut] = useState("white");
  const [img1, setImg1] = useState(img);
  const [check, setCheck] = useState(false);
  const [remaining, setRemaining] = useState("");
  
  const [nav1, setNav1]=useState(navstyle1);
  const [nav2, setNav2]=useState(navstyle);
  const [nav3, setNav3]=useState(navstyle);


  function handleKeyDown(e) {
    if (e.key === "Enter") {
      let idvalue = data.length + 1;
      const old = { id: idvalue, text: todo, check: check };
      setData([...data, old]);
      setActive([...data, old]);
      setTodo("");
      setCheck(false);
    }
  }
  function Delete(id) {
    var updated = data.filter((e) => e.id !== id);
    if (updated.length === 0) {
      const id = updated.sort((a, b) => (a.id = b.id + 1));
      setData(id);
      setActive(id);
    } else {
      updated[0].id = 1;
      const id = updated.sort((a, b) => (a.id = b.id + 1));
      setData(id);
      setActive(id);
    }
  }
  function checkClicked(id) {
    const array = [...data];
    const value = array.findIndex((e) => e.id === id);
    array[value] = { ...array[value], check: !array[value].check };
    setData(array);
    setActive(array);
  }
  function clickmode() {
    if (mode !== "#dfe3e8") {
      setMode("#dfe3e8");
      setDay(false);
      setImg1(img2);
      setGrey("white");
      setOut("black");
    } else {
      setMode("black");
      setDay(true);
      setImg1(img);
      setGrey("#162536");
      setOut("white");
    }
  }

  useEffect(() => {
    const value = data.filter((e) => e.check === false);
    setRemaining(value.length);
    console.log("usestare");
  }, [data]);

  return (
    <div className="App">
      <div className="input" style={{ backgroundImage: "url(" + img1 + ")" }}>
        <div className="header">
          <div className="brand-icon">
            <h1 className="brand">T O D O</h1>
            {day !== true ? (
              <TiWeatherNight
                style={{ width: 40, height: 40, color: "white" }}
                onClick={clickmode}
              />
            ) : (
              <WiDaySunny
                style={{ width: 40, height: 40, color: "white" }}
                onClick={clickmode}
              />
            )}
          </div>
          <div className="inputline">
            <div className="input-group">
              <div className="input-group-prepend">
                <div
                  className="input-group-text"
                  style={{ backgroundColor: grey, border: "none" }}
                >
                  {check === false ? (
                    <IoIosRadioButtonOff
                      style={{ width: 30, height: 30, color: out }}
                      onClick={() => {
                        setCheck(true);
                      }}
                    />
                  ) : (
                    <IoIosCheckmarkCircleOutline
                      style={{ width: 30, height: 30, color: out }}
                      className="iconclick"
                      onClick={() => setCheck(false)}
                    />
                  )}
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="todo"
                value={todo}
                onChange={(e) => {
                  setTodo(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                style={{ border: "none", backgroundColor: grey, height: 50 }}
              />
            </div>
          </div>
        </div>
        <div className="output1">
          {active.map((e, key) => (
            <div className="task" style={{ backgroundColor: grey }} key={key}>
              {e.check === false ? (
                <IoIosRadioButtonOff
                  style={{ width: 30, height: 30, color: out }}
                  onClick={() => checkClicked(e.id)}
                />
              ) : (
                <IoIosCheckmarkCircleOutline
                  style={{ width: 30, height: 30, color: out }}
                  className="iconclick"
                  onClick={() => checkClicked(e.id)}
                />
              )}
              {e.check === true ? (
                <div className="task1">
                  <p style={{ color: "grey", textDecoration: "line-through" }}>
                    {e.text}
                  </p>
                </div>
              ) : (
                <div className="task1">
                  <p style={{ color: out }}>{e.text}</p>
                </div>
              )}

              <IoIosClose
                style={{ width: 40, height: 40, color: out }}
                onClick={() => Delete(e.id)}
              />
            </div>
          ))}
          {data.length !== 0 ? (
            <Fragment>
            <div
              className="bottom"
              style={{ backgroundColor: grey, color: out }}
            >
              <p style={{ color: "grey" }}>{remaining} items left</p>
              <div className="bottom2">
                <p
                  style={nav1}
                  onClick={() => {
                    setActive(data);
                    if (nav1 !== navstyle) {setNav1(navstyle1); setNav2(navstyle); setNav3(navstyle)} 
                    else {setNav1(navstyle1);setNav2(navstyle); setNav3(navstyle) }
                  }}
                >
                  All
                </p>
                <p
                  style={nav2}
                  onClick={() => {
                    const value = data.filter((e) => e.check === false);
                    setActive(value) ;
                    if (nav2 === navstyle) {setNav1(navstyle); setNav2(navstyle1); setNav3(navstyle)} 
                    else {setNav2(navstyle); }
                  }}
                >
                  Active
                </p>
                <p
                  style={nav3}
                  onClick={() => {
                    const value = data.filter((e) => e.check === true);
                    setActive(value);
                    if (nav3 === navstyle) {setNav1(navstyle); setNav2(navstyle); setNav3(navstyle1)} 
                    else {setNav3(navstyle);}
                  }}
                >
                  Completed
                </p>
              </div>
              <p
                style={{ color: "grey", cursor: "pointer" }}
                onClick={() => {setData([]);setActive([])}}
              >
                Clear Completely
              </p>
            </div>


            <div className="mobile"  >


              <div className="mobilebottom" style={{ backgroundColor: grey, color: out }}>

              <p style={{ color: "grey" }}>{remaining} items left</p>
              <p
                style={{ color: "grey", cursor: "pointer" }}
                onClick={() => {setData([]);setActive([])}}
              >
                Clear Completely
              </p>
              </div>
              <div className="mobilebottom1" style={{ backgroundColor: grey, color: out }}>
                <p
                  style={nav1}
                  onClick={() => {
                    setActive(data);
                    if (nav1 !== navstyle) {setNav1(navstyle1); setNav2(navstyle); setNav3(navstyle)} 
                    else {setNav1(navstyle1);setNav2(navstyle); setNav3(navstyle) }
                  }}
                >
                  All
                </p>
                <p
                  style={nav2}
                  onClick={() => {
                    const value = data.filter((e) => e.check === false);
                    setActive(value) ;
                    if (nav2 === navstyle) {setNav1(navstyle); setNav2(navstyle1); setNav3(navstyle)} 
                    else {setNav2(navstyle); }
                  }}
                >
                  Active
                </p>
                <p
                  style={nav3}
                  onClick={() => {
                    const value = data.filter((e) => e.check === true);
                    setActive(value);
                    if (nav3 === navstyle) {setNav1(navstyle); setNav2(navstyle); setNav3(navstyle1)} 
                    else {setNav3(navstyle);}
                  }}
                >
                  Completed
                </p>
              </div>




              
            </div>
          </Fragment>
          ) : null}
        </div>
      </div>

      <div className="output" style={{ backgroundColor: mode }}></div>
    </div>
  );
}

export default App;
