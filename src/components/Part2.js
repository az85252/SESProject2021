import React,{Component} from "react"
import { useState } from "react"

class Part2 extends Component {
    APIkey = "&api_key=0kqZUVchxPk1ACNqc9wYSnJMLgOLWt7fm2Yd8D85";

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            names : {},
            alphabetChart: {},
            limit : "50",
            images : [],
            showImages: false
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      componentDidMount(){
        this.createLetterSlider()
        this.getParkNamesAndIDs()
      
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleLimit(event) {
        this.setState({limit: event.target.value});
      }

      handleClear(event) {
        this.setState({value: "",
        limit: "50"});
        event.preventDefault();
      }
    
      handleSubmit(event) {
        alert('A name was submitted:' + (this.state.names[this.state.value.toLowerCase()])[1]);
        event.preventDefault();

        var APIurl = "https://developer.nps.gov/api/v1/webcams?parkCode="+(this.state.names[this.state.value.toLowerCase()])[1]+"&limit="+this.state.limit+this.APIkey;
        console.log(APIurl)
        fetch(APIurl)
        .then(response => response.json())
        .then(json => {
            this.setState(({images: json.data}), () => {});
            console.log(this.state.images)
        });

      }
      createLetterSlider(){
        var temp = {}
        for ( var i = 0; i < 26; i++ ) {
          temp[String.fromCharCode(65 + i)] = "null"
        }
        this.setState(({alphabetChart: temp}), () => {});
      }
      
      getParkNamesAndIDs() {
        var temp = []
        var temp2 = {}
        var APIurl = "https://developer.nps.gov/api/v1/parks?limit=1000"+this.APIkey;
        fetch(APIurl)
        .then(response => response.json())
        .then(json => {
            temp = json.data;
            console.log(temp)
            for (var i = 0; i < temp.length; i++){
                temp2[temp[i].fullName.toLowerCase()] = [temp[i].fullName, temp[i].parkCode];
            }
            this.setState(({names: temp2}), () => {});
            console.log(this.state.names)
            console.log(Object.keys(this.state.names))
        }); 
      }

      getWebCams(parkCode){

      }

      render() {
        return (
            <>
            <div className="spacing"/>
            <h1>Webcams</h1>
            <form onSubmit={this.handleSubmit}>
                <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <label>
                How Many?:
                <input type="text" value={this.state.limit} onChange={this.handleLimit} />
                </label>
                <input type="submit" value="Submit" />
                <input type="submit" value="Clear" />
            </form>
            {Object.keys(this.state.alphabetChart).map((x) => (
                <>
                    {((this.state.value).trim() === "") ? <button className = "smSquare" onClick={() => this.setState({value: x})}>{x}</button> : null }
                </>
            ))}
             {(1=== 1) ? <button className = "smSquare" onClick={() => this.setState({value: ""})}>Clear</button> : null }
            {Object.keys(this.state.names).map((x) => (
                <>
                    {((x).startsWith(this.state.value.toLowerCase()) && (this.state.value).trim() !== "") ? <button onClick={() => this.setState({value: this.state.names[x][0]})}>{this.state.names[x][0]}</button> : null }
                </>
            ))}
            { this.state.images.length !== 0 ?<h1>Webcams</h1>: null}
            {this.state.images.map((x) => (
              <>
                <h2>{x.title}</h2>
                {x.isStreaming === true ?<h3>Streaming</h3>: <h3>Not Streaming</h3>}
                <h3>{x.status}</h3>
                <t>{x.description}</t>
                <form action={x.url} target="popup">
                  <button className = "testlink">URL</button>
                </form>
                {x.images.length > 0 ? 
                    x.images.map((y) =>(
                      <div className="blockk">
                      <t>{y.title}</t>
                      <a href={y.url}>
                        <img src={y.url} alt={y.altText}></img>
                      </a>
                      <t>{y.caption}</t>
                      <i>{y.credit}</i>
                      </div>
                    ))
                  : <h2>No images provided!</h2> }
              </>
            ))}

            </> //END
        );
      }
}

export default Part2;