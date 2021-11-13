
import React,{Component} from 'react'
import Post from "./Post";
import "./Part1.css";
import ParkInfo from './ParkInfo';
import { Switch, Route } from "react-router-dom";

class Part1 extends Component {

  render(){
    return (
      
      <div className="Part1">
        
        <Switch>
        <Route exact path="/parkinfo" component={ParkInfo} />
        <Route path="/parkinfo/:number" component={ParkInfo} />
        </Switch>
      </div>
    );
  }
  
}
export default Part1;