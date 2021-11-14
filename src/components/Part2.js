import React, { Component } from "react"
import { useState } from "react"
import info from '../images/info.png';

class Part2 extends Component {
  APIkey = "&api_key=0kqZUVchxPk1ACNqc9wYSnJMLgOLWt7fm2Yd8D85";

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      names: {},
      alphabetChart: {},
      limit: "50",
      images: [],
      showImages: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.createLetterSlider();
    this.getParkNamesAndIDs();

  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }


  handleSubmit() {
    this.setState({ showImages: true});
    if (this.state.value.toLowerCase() in this.state.names){
      var APIurl = "https://developer.nps.gov/api/v1/webcams?parkCode=" + (this.state.names[this.state.value.toLowerCase()])[1] + "&limit=" + this.state.limit + this.APIkey;
      console.log(APIurl)
      fetch(APIurl)
        .then(response => response.json())
        .then(json => {
          this.setState(({ images: json.data }), () => { });
          console.log(this.state.images);
        });
    }
    

  }
  createLetterSlider() {
    var temp = {}
    for (var i = 0; i < 26; i++) {
      temp[String.fromCharCode(65 + i)] = "null";
    }
    this.setState(({ alphabetChart: temp }), () => {});
  }

  getParkNamesAndIDs() {
    var temp = [];
    var temp2 = {};
    var APIurl = "https://developer.nps.gov/api/v1/parks?limit=1000" + this.APIkey;
    fetch(APIurl)
      .then(response => response.json())
      .then(json => {
        temp = json.data;
        console.log(temp)
        for (var i = 0; i < temp.length; i++) {
          temp2[temp[i].fullName.toLowerCase()] = [temp[i].fullName, temp[i].parkCode];
        }
        this.setState(({ names: temp2 }), () => { });
        console.log(this.state.names);
        console.log(Object.keys(this.state.names));
      });
  }

  render() {
    return (
      <>
        <div className="spacing" />
        <div className="spacing" />
        <div className="infoTip">
        <h1>Webcams</h1>
        <div>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          {(1 === 1) ? <button className="smSquare" onClick={() => this.handleSubmit()}>Submit</button> : null}
        {(1 === 1) ? <button className="smSquare" onClick={() => this.setState({ value: "", showImages: false, images: []})}>Clear</button> : null}
        </div>
       
        {Object.keys(this.state.alphabetChart).map((x) => (
          <>
            {((this.state.value).trim() === "") ? <button className="smSquare" onClick={() => this.setState({ value: x })}>{x}</button> : null}
          </>
        ))}
        

        </div>
        {this.state.showImages === false ?(
          <div className="infoTip">
          {(this.state.value).trim() !== "" ? <h1>Results</h1>:<h1>Parks</h1>}
          {Object.keys(this.state.names).map((x) => (
            <>
              {((x).startsWith(this.state.value.toLowerCase()) || (this.state.value).trim() === "") ? <button onClick={() => this.setState({ value: this.state.names[x][0] })}>{this.state.names[x][0]}</button> : null}
            </>
          ))}
          </div>
        ):null}

        {this.state.showImages === true ? ( this.state.images.length !== 0 ? <div className="infoTip">
        {this.state.images.length !== 0 && this.state.showImages === true ? this.state.images.map((x) => (
          <>
            <h1>{x.title}</h1>
            <div className="infoSection">
            {x.isStreaming === true ? <h3>Streaming, {x.status}</h3> : <h3>Non-Streaming, {x.status}</h3>}
            <t>{x.description}</t>
            
            {x.images.length > 0 ?
              x.images.map((y) => (
                
                <div className= "imageSection">
                <h3>{y.title}</h3>
                <a href={y.url}>
                <img src={y.url} alt={y.altText}></img>
                </a>
                  
                  <p>{y.caption}</p>
                  <i>{y.credit}</i>
                </div>
              ))  
              : <h2>No images provided!</h2>} 
              <form action={x.url} target="popup">
              <button className="testlink">More Info</button>
              </form>
              </div>
          </>
        )): null}</div>: <div className="infoTip"> 
        <div>
        <img src={info} className='infoImg'/><h1>No Webcams Found!</h1>  
        <div className="infoSection">
          <li>This park may not have any webcams provided</li>
          <li>Check for any spelling and grammar mistakes</li>
          <li>Make sure the park name you entered is valid</li>
        </div>
        </div>
        
        
        </div>) : null}
        

      </> //END
    );
  }
}

export default Part2;