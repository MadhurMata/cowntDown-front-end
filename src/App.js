import React, { Component } from 'react';

import './App.css';

import Input from "./Input"
import routeService from "./routes-service";

export default class App extends Component {
  state = {
    name: "",
    deadline: '2019-08-12',
    counter: {},
    names: [],
  };

  componentDidMount(){
    this.getNames();
    setInterval(() => {
      const counter = this.getTimeRemaining(this.state.deadline)
        this.setState({counter})    
    }, 1000);
  }

  getNames = () => {
    routeService.getName()
      .then(data => {
        this.setState({
          names: data,
        })
      }).catch(error => {
        console.log("error", error);
      });
  };

  // didcomponentupdate(){
    
  //  const counter = this.getTimeRemaining(this.state.deadline)
  //   if (this.state.counter === counter){
  //     this.setState({counter})
  //   }   
  // } 

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { name } = this.state
    routeService.create(name)
      .then(data => {
        return data;
      })
      .catch(error => console.log(error.response));
  };



getTimeRemaining = (endTime) => {
  const timeDiference = Date.parse(endTime) - Date.parse(new Date());
  const seconds = Math.floor( (timeDiference/1000) % 60 );
  const minutes = Math.floor( (timeDiference/1000/60) % 60 );
  const hours = Math.floor( (timeDiference/(1000*60*60)) % 24 );
  const days = Math.floor( timeDiference/(1000*60*60*24) );
  const counter =  {
    'total': timeDiference,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
  return counter
};

  // getUser = (event) => {
  //   event.preventDefault();
  //   const { name } = this.state;
  //   routeService.getUser(name.toLocaleLowerCase())
  //     .then(data => {
  //       if (data.length === 0){
  //         this.setState({
  //           route: [],
  //           stage: 0,
  //           message: true
  //         })
  //       } else {
  //         this.setState({
  //           route: data,
  //           state: 1,
  //           message: false
  //         })
  //       }
  //     }).catch(error => { console.log("error", error)});
  //   };


  render() {
    const { name, deadline, counter, names } = this.state;
    return (
      <div className="App">
        <header className="App-header">
        <form className="form" onSubmit={this.handleFormSubmit}>
                <div className="input-box">
                  <Input
                    label="Name"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
  
                  />
                </div >
                <div className="buttons">
                  <button className="button">Search Route</button>
                </div>
              </form>       
        </header>
        <main>
          <div className="counter">
            <p>{counter.days} Days {counter.hours} h {counter.minutes} min {counter.seconds} sec</p>
          </div>
          <div class="names-list">
            {names.map((name)=>{return <p class="element">{name.name}</p> })}
          </div>
        </main>
      </div>
    );
  }
}
