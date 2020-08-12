import React from 'react';
import './App.scss';
import Select from 'react-select'

const STORE_KEYS = {
  typeId: "typeId",
  taskTitle: "taskTitle",
}

class App extends React.Component {
  state = {
    taskTitle: localStorage.getItem(STORE_KEYS.taskTitle) || "",
    typeId: localStorage.getItem(STORE_KEYS.typeId),
  }
  
  handleInput = (e) => {
    const {value: taskTitle} = e.target;
    localStorage.setItem(STORE_KEYS.taskTitle, taskTitle)
    
    this.setState({
      taskTitle
    })
  }
  
  handleSelect = type => {
    const {value: typeId} = type ? type : {};
    localStorage.setItem(STORE_KEYS.typeId, typeId);
    
    this.setState({
      typeId
    })
  }
  
  options = [
    {value: "BUG", label: "bug"},
    {value: "FEATURE", label: "feature"}
  ]
  
  get type() {
    return this.options.find(({value}) => value === this.state.typeId)
  }
  
  get parsedTaskTitle() {
    return this.state.taskTitle.trim().replace(/ /g, "_")
  }
  
  get result() {
    return `${this.type ? `${this.type.label}/` : ""}${this.parsedTaskTitle ? this.parsedTaskTitle : ""}`
  }
  
  get defaultTaskTitle() {
    return localStorage.getItem(STORE_KEYS.taskTitle)
  }
  
  render() {
    return (
      <div className="app">
        <div className="contentWrapper">
          <div className="form">
            <Select
              isClearable
              placeholder="Type"
              menuPosition="fixed"
              className="selectType"
              options={this.options}
              defaultValue={this.type}
              onChange={this.handleSelect}
            />
            <textarea
              className="input"
              onChange={this.handleInput}
              placeholder="Task title"
              defaultValue={this.defaultTaskTitle}
            />
          </div>
        <textarea className="input" value={this.result} placeholder="Parsed result" />
        </div>
      </div>
    );
  }
}

export default App;
