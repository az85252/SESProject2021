import './App.css';
import React, { Component } from 'react'
import Footer from "./components/Footer"
import JSONTest from './components/JSONTest';
import ParkInfo from "./components/ParkInfo";
import Part2 from "./components/Part2";
import { Switch, Route } from 'react-router-dom'


class App extends Component {
  parksList = []
  constructor(props) {
    super(props)
    this.state = {
      parks: [],
    }
  }
  componentDidMount() {
    //each time the app loads we need to set routes of park infos
    this.getParkNamesAndIDs()
  }

  getParkNamesAndIDs() {
    var APIkey = "&api_key=0kqZUVchxPk1ACNqc9wYSnJMLgOLWt7fm2Yd8D85";
    var temp = []
    var APIurl = "https://developer.nps.gov/api/v1/parks?limit=1000" + APIkey;
    fetch(APIurl)
      .then(response => response.json())
      .then(json => {
        temp = json.data;
        //after fetching the parks we grab the parkcodes and put them to a list
        
        for (var i = 0; i < temp.length; i++) {
          this.parksList[i] = temp[i].parkCode;
        }
        this.setState(({ parks: this.parksList }), () => { });
      });
  }

  render() {
    return (
      <main>
        <div className="App">
          <Switch>
            <Route exact path='/' component={JSONTest} />
            <Route exact path='/webcams' component={Part2} />
            <Route exact path='/parkinfo' component={ParkInfo} />
          </Switch>
          {this.state.parks.map((x) => (
            <>
              <Route path={`/parkinfo/${x}`} component={ParkInfo} />
            </>
          ))}
          
        </div>
        <Footer />
        

      </main>
    );
  }

}

export default App;
