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
    {value: "bugfix", label: "bugfix"},
    {value: "feature", label: "feature"},
    {value: "hotfix", label: "hotfix"},
    {value: "subtask", label: "subtask"},
    {value: "task", label: "task"},
  ]

  get type() {
    return this.options.find(({value}) => value === this.state.typeId)
  }

  get parsedTaskTitle() {
    return this.state.taskTitle.trim()
      .replace(/ /g, "-")
      .replace('[FE]', "")
      .replace(/[/\\+!,]/g, "-")
      .replace(/-{2}/g, "-")
  }

  get result() {
    return `${this.type ? `${this.type.label}/` : ""}${this.parsedTaskTitle ? this.parsedTaskTitle : ""}`
  }

  get commitMessage() {
    return this.state.taskTitle.trim().replace('[FE]', ":").replace(" : ", ": ").replace(" :", ": ")
  }


  get defaultTaskTitle() {
    return localStorage.getItem(STORE_KEYS.taskTitle)
  }

  customStyles = {
    control: (styles, {isFocused}) => ({
      ...styles,
      background: "#585858",
      boxShadow: "none",
      border: isFocused ? "1px solid #a3a3a3": "1px solid #737373",
      ':hover': {
        ...styles[':hover'],
        borderColor: "#a3a3a3",
      },
    }),
    singleValue: styles => ({
      ...styles,
      color: "#eee",
      fontFamily: "monospace",
      fontSize: 14
    }),
    menuList: styles => ({
      ...styles,
      background: "#585858"
    }),
    option: (styles, {isSelected}) =>({
      ...styles,
      color: "#eee",
      cursor: "pointer",
      backgroundColor: isSelected ? "#474747" : "#585858",
      ':hover': {
        ...styles[':hover'],
        backgroundColor: "#474747",
      },
    })
  }

  render() {
    return (
      <div className="app">
        <div className="contentWrapper">
          <div className="inputWrapper">
            <div className="label">Origin</div>
            <input
              className="input"
              onChange={this.handleInput}
              placeholder="Task title"
              defaultValue={this.defaultTaskTitle}
            />
          </div>
          <div className="form">
            <div className="inputWrapper">
              <div className="label">type</div>
              <Select
                placeholder="Type"
                isSearchable={false}
                menuPosition="fixed"
                className="selectType"
                styles={this.customStyles}
                options={this.options}
                defaultValue={this.type}
                onChange={this.handleSelect}
              />
            </div>
          </div>
          <div className="inputWrapper">
            <div className="label">branch</div>
            <input className="input result" value={this.result} placeholder="Branch name" />
          </div>
          <div className="inputWrapper">
            <div className="label">commit</div>
            <input className="input result" value={this.commitMessage} placeholder="Commit message" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
