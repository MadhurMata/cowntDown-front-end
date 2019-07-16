import React, { Component } from 'react';

import './App.css';

import Input from "./Input"
import routeService from "./routes-service";

export default class App extends Component {
  state = {
    name: "",
    deadline: '2019-08-13',
    counter: {},
    names: [],
    random: Math.floor(Math.random()*100),
    colors: ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"],
  };
  myParagraph = [];

  componentDidMount(){
    setInterval(() => {
      const counter = this.getTimeRemaining(this.state.deadline)     
        this.getNames();
        this.setState({
          counter,
        })    
    }, 1000);
    setInterval(() => {
      this.myParagraph.forEach((item) =>  {
        item.classList.toggle('rotate');
      });
    }, 5000);
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

  addSpanRef = (node) => {
    this.myParagraph = [...this.myParagraph, node]
  }

  randomNumber = () =>{
    const number = Math.floor(Math.random()*100)
    const sign = Math.floor(Math.random()*10)
    if(sign < 2){
    return number
      } else {
    return number * -1
      }
  } 

  randomMovement = () => {
    const { names, colors } = this.state
    const oneColor = colors[Math.floor(Math.random()*colors.length)]

    const start = Math.floor(Math.random());
    console.log(names.length)
    if(names.length) {
      console.log('no entres', names)
      names.map((name, index)=>{
        if(start === 1){
          return (
          <div className="beer rotate"
          key={index} 
          ref={this.addSpanRef} 
          style={{ 
            color: `${oneColor}`, 
            position: "absolute", 
            top:`${Math.floor(Math.random()*100)}vh`, 
            left:`${Math.floor(Math.random()*100)}vw`, 
            transform: `translateX(${this.randomNumber()}vw) 
            translateY(${this.randomNumber()}vh) 
            rotate(${Math.random()*360}deg)`
          }} >
            <p>{name.name}</p>     
          </div>
          )   
        } else {
          return (
            <div className="beer rotate"
            key={index} 
            ref={this.addSpanRef} 
            style={{ 
              color: `${oneColor}`, 
              position: "absolute", 
              top:`${Math.floor(Math.random()*100)}vh`, 
              left:`${Math.floor(Math.random()*100)}vw`, 
              transform: `translateY(${this.randomNumber()}vw) 
              translateX(${this.randomNumber()}vh) 
              rotate(${Math.random()*-360}deg)`
            }} >
              <p>{name.name}</p>     
            </div>
            ) 
        }
      })
    }
  }

  render = () => {
    const { name, counter, names } = this.state;
    return (
      <div className="App">
        <header className="App-header">
        <div>
            <h1>Beer Time!!</h1>
            <h3>Join Mad's</h3>
        </div>
        <form className="form" onSubmit={this.handleFormSubmit}>
                <div className="input-box">
                  <Input
                    label="Write your name here..."
                    name="name"
                    value={name}
                    onChange={this.handleChange}
  
                  />
                </div >
              </form>       
        </header>
        <main>
          <div className="counter">
            <h2>{counter.days} <span className="display-letters">Days</span>  {counter.hours} <span className="display-letters">h</span> {counter.minutes} <span className="display-letters">min</span> {counter.seconds} <span className="display-letters">sec</span></h2>
          </div>
          <div className="names-list element">
            {this.randomMovement() || names.map((name, index)=>{
              return (
                <div className="beer rotate"
                key={index} 
                ref={this.addSpanRef} 
                style={{ 
                  // color: `${oneColor}`, 
                  position: "absolute", 
                  top:`${Math.floor(Math.random()*100)}vh`, 
                  left:`${Math.floor(Math.random()*100)}vw`, 
                  transform: `translateX(${this.randomNumber()}vw) 
                  translateY(${this.randomNumber()}vh) 
                  rotate(${Math.random()*360}deg)`
                }} >
                  <p>{name.name}</p>     
                </div>
                )
              }
            )}
          </div>
        </main>
      </div>
    );
  }
}
