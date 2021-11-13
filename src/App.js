import logo from './logo.svg';
import './App.css';
import Part1 from "./components/Part1";
import React,{Component} from 'react'
import Header from "./components/Header"
import Footer from "./components/Footer"
import JSONTest from './components/JSONTest';
import ParkInfo from "./components/ParkInfo";
import Part2 from "./components/Part2";
import { Switch, Route } from 'react-router-dom'


class App extends Component {
  arr = []
  constructor(props) {
    super(props)
    this.state = {
      parks: [],
    }
  }
  componentDidMount(){
    this.getParkNamesAndIDs()
    console.log(this.arr)
    console.log(this.arr.length)
  }

  getParkNamesAndIDs() {
    var APIkey = "&api_key=0kqZUVchxPk1ACNqc9wYSnJMLgOLWt7fm2Yd8D85";
    var temp = []
    var APIurl = "https://developer.nps.gov/api/v1/parks?limit=1000"+ APIkey;
    console.log(APIurl)
    fetch(APIurl)
    .then(response => response.json())
    .then(json => {
        temp = json.data;
        for (var i = 0; i < temp.length; i++){
            this.arr[i] = temp[i].parkCode;
        }
        this.setState(({parks: this.arr}), () => {});
        console.log(this.arr.length)
    }); 
  }
  render(){
    return (
      

      <main>
        <div className = "App">
        <Switch>
            <Route exact path='/' component={JSONTest}/>
            <Route exact path='/Part2' component={Part2}/>
            <Route exact path='/parkinfo' component={ParkInfo}/>
        </Switch>
        {this.state.parks.map((x) => (
              <>
              <Route path={`/parkinfo/${x}`} component={ParkInfo}/>
              </>
          ))}
        </div>
        <Footer/>
        <Header/>
        
      </main>
    );
  }
  
}

export default App;
