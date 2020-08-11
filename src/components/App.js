import React from 'react';
import './App.scss';
import Select from 'react-select'

const STORE_KEYS = {
  prefix: "prefix",
  ticket: "ticket",
  parsedTicket: "parsedTicket"
}


class App extends React.Component {
  state = {
    parsedTicket: localStorage.getItem(STORE_KEYS.parsedTicket),
    prefix: localStorage.getItem(STORE_KEYS.prefix),
  }
  
  handleInput = (e) => {
    const {value} = e.target;
    localStorage.setItem(STORE_KEYS.ticket, value)
    
    const parsedTicket = value.replace(/ /g, "_")
    this.setParsedTicket(parsedTicket)
    localStorage.setItem(STORE_KEYS.parsedTicket, parsedTicket)
  }
  
  handleSelect = (prefix) => {
    let value = ""
    if (prefix !== undefined) {
      value = `${prefix}/`
    }
    localStorage.setItem(STORE_KEYS.prefix, value)
    this.setPrefix(value)
  }
  
  setParsedTicket = parsedTicket => {
    this.setState({
      parsedTicket
    })
  }
  
  
  setPrefix = prefix => {
    this.setState({
      prefix
    })
  }
  
  render() {
    const {prefix, parsedTicket} = this.state;
    const result = `${prefix ? prefix : ""}${parsedTicket ? parsedTicket : ""}`
    
    return (
      <div className="app">
          {/*<Select*/}
          {/*  isClearable*/}
          {/*  placeholder="Type"*/}
          {/*  className="typeSelector"*/}
          {/*  defaultValue={prefix ? prefix.split("/")[0] : undefined}*/}
          {/*  onChange={this.handleSelect}*/}
          {/*  options={[*/}
          {/*    {value: "BUG", label: "Bug"},*/}
          {/*    {value: "FEATURE", label: "Feature"}*/}
          {/*  ]}*/}
          {/*/>*/}
          {/*<input*/}
          {/*  className="input"*/}
          {/*  defaultValue={localStorage.getItem(STORE_KEYS.ticket)}*/}
          {/*  onChange={this.handleInput}*/}
          {/*  placeholder="Insert ticket here"*/}
          {/*/>*/}
          <textarea className="result"  placeholder="Result" />
      </div>
    );
  }
}

export default App;
