import React, { Component } from "react"
import info from '../images/info.png';
import {isMobile} from 'react-device-detect';
import {BrowserView, MobileView} from 'react-device-detect';

class Webcams extends Component {
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
    this.setState({ showImages: true });
    if (this.state.value.toLowerCase() in this.state.names) {
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
    this.setState(({ alphabetChart: temp }), () => { });
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
        {this.state.showImages === false ?
          <div className="infoSectionCenter">
            <h1>Web Cameras</h1>
            <div>
              <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <button className="smallButton" onClick={() => this.handleSubmit()}>Submit</button>
              <button className="smallButton" onClick={() => this.setState({ value: "", showImages: false, images: [] })}>Clear</button>
            </div>

            {Object.keys(this.state.alphabetChart).map((x) => (
              <>
                {((this.state.value).trim() === "") ? <button className="smallButton" onClick={() => this.setState({ value: x })}>{x}</button> : null}
              </>
            ))}
          </div> : null}

        {this.state.showImages === false ? (
          <div className="infoSectionCenter">
            {(this.state.value).trim() !== "" ? <h1>Results</h1> : <h1>Parks</h1>}
            <div className="dropDownParks" style={ isMobile ? {width:"100%"}: {}}>
            {Object.keys(this.state.names).map((x) => (
              <>
                {((x).startsWith(this.state.value.toLowerCase()) || (this.state.value).trim() === "") ? <button className="parkSelector" onClick={() => this.setState({ value: this.state.names[x][0] })}>{this.state.names[x][0]}</button> : null}
              </>
            ))}
            </div>
          </div>
        ) : null}

        {this.state.showImages === true ? (this.state.images.length !== 0 ? <div>
          <h1>Web Cameras</h1>
          {this.state.images.length !== 0 && this.state.showImages === true ? this.state.images.map((x) => (
            <>
              <div className="infoSection">
                <h1>{x.title}</h1>
                <div className="seperator"/>
                {x.isStreaming === true ? <h3>Streaming, {x.status}</h3> : <h3>Non-Streaming, {x.status}</h3>}
                <t>{x.description}</t>

                {x.images.length > 0 ?
                  x.images.map((y) => (
                    <div className="imageSection">
                      <h3 style={{textAlign: "center"}} >{y.title}</h3>
                      <a href={y.url}>
                        <BrowserView>
                            <img src={y.url} alt={y.altText} className="img" style = {{width:"75%"}}></img>
                        </BrowserView>
                        <MobileView>
                            <img src={y.url} alt={y.altText} className="img"></img>    
                        </MobileView>
                      </a>
                      <div className="infoSection">
                        <p>{y.caption}</p>
                        <i>{y.credit}</i>
                      </div>
                    </div>
                  ))
                  : <h2>No images provided!</h2>}
                <form action={x.url} target="popup">
                  <button className="testlink">More Info</button>
                </form>
              </div>
            </>
          )) 
          : null}

          <div className="footer"style={{
              position: "fixed",
              top:"calc(100% - 64px)",
              left:"0px",
              bottom: "0px",
              justifySelf:"center"
            }}>
            <div className="dropDownParks" >  
              <button className="parkSelector closer" 
              onClick={() => this.setState({ value: "", showImages: false, images: [] })}>Close</button>
            </div>
          </div>
        </div> : <div className="infoSectionCenter">
          <div>
            <img src={info} className='infoImg' /><h1>No Web Cameras Found!</h1>
            <div className="infoSection">
              <li>This park may not have any web cameras provided</li>
              <li>Check for any spelling and grammar mistakes</li>
              <li>Make sure the park name you entered is valid</li>
            </div>
            <div className="dropDownParks">
              <button className="parkSelector closer" onClick={() => this.setState({ value: "", showImages: false, images: [] })}>Close</button>
            </div>
          </div>
        </div>) : null}
        <div className="spacing" />
        <div className="spacing" />  
      </> //END
    );
  }
}

export default Webcams;