import React, {useState} from 'react';
import { Input, Select } from 'antd';
import './App.css';
import 'antd/dist/antd.css';

const {Option} =Select

const STORE_KEYS = {
  prefix: "prefix",
  ticket: "ticket",
  parsedTicket: "parsedTicket"
}
const handleInput = (e, setParsedTicket) => {
  const {value} = e.target;
  localStorage.setItem(STORE_KEYS.ticket, value)
  
  const parsedTicket = value.replace(/ /g, "_")
  setParsedTicket(parsedTicket)
  localStorage.setItem(STORE_KEYS.parsedTicket, parsedTicket)
}

const handleSelect = (prefix, setPrefix) => {
  let value = ""
  if (prefix !== undefined) {
    value = `${prefix}/`
  }
  localStorage.setItem(STORE_KEYS.prefix, value)
  setPrefix(value)
}

function App() {
  const [parsedTicket, setParsedTicket] = useState(localStorage.getItem(STORE_KEYS.parsedTicket))
  const [prefix, setPrefix] = useState(localStorage.getItem(STORE_KEYS.prefix))
  const result = `${prefix ? prefix : ""}${parsedTicket ? parsedTicket : ""}`

  return (
    <div className="app">
      <div className="wrapper">
        <Input
          className="input"
          defaultValue={localStorage.getItem(STORE_KEYS.ticket)}
          onChange={e => handleInput(e, setParsedTicket)}
          placeholder="Insert ticket here"
        />
        <div className="result">
          <Select
            allowClear
            placeholder="Type"
            className="typeSelector"
            defaultValue={prefix ? prefix.split("/")[0] : undefined}
            onChange={prefix => handleSelect(prefix, setPrefix)}
          >
            <Option value="bug">bug</Option>
            <Option value="feature">feature</Option>
          </Select>
          <Input className="inputResult" value={result} placeholder="Result" />
        </div>
      </div>
    </div>
  );
}

export default App;
