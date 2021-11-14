
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import "./Part1.css";
import info from '../images/info.png';

class JSONTest extends Component {

  state = {
    isActive: false,
    text: [],
    listOfParks: "",
    selectedID: "",
  };
  APIkey = "&api_key=0kqZUVchxPk1ACNqc9wYSnJMLgOLWt7fm2Yd8D85"
  ParksByActivityList = [
    {
      "id": "13A57703-BB1A-41A2-94B8-53B692EB7238"
      , "name": "Astronomy"
      , "parks": [
        {
          "states": "AA",
          "parkCode": "blnk",
          "designation": "National Park",
          "fullName": "Test National Park",
          "url": "https://www.google.com",
          "name": "Test"
        },]
    }];

  activityData = [{}];

  //Immediately load all possible activities
  componentDidMount() {
    this.getActivitiesJSON();
  }

  getActivitiesJSON() {
    fetch('https://developer.nps.gov/api/v1/activities?api_key=0kqZUVchxPk1ACNqc9wYSnJMLgOLWt7fm2Yd8D85')
      .then(response => response.json())
      .then(json => {
        this.activityData = json.data
        this.setState(({
          text: json.total
        }), () => console.log(this.state.text))
      })
  }

  getParksByActivity(activityID) {
    if (this.state.selectedID !== activityID) {
      var url = "https://developer.nps.gov/api/v1/activities/parks?id=" + String(activityID) + this.APIkey
      fetch(url)
        .then(response => response.json())
        .then(json => {
          this.ParksByActivityList = json.data;
          this.ParksByActivityList = this.ParksByActivityList;
          this.setSelectedID(activityID);
          console.log(this.state.selectedID + " " + activityID);
        });
    }
    this.switchButton(activityID);
  }

  switchButton(activityID) {
    if (this.state.selectedID === activityID) {
      this.setState(prevState => ({
        isActive: !prevState.isActive
      }))
    } else {
      this.setState(({
        isActive: true
      }))
    }
  }


  setSelectedID(value) {
    this.setState(({
      selectedID: value,
      listOfParks: "https://developer.nps.gov/api/v1/activities/parks?id=" + String(value) + this.APIkey
    }), () => console.log(this.state.text))
    return;
  }

  render() {
    return (
      <div>
        <div className="spacing" />
        <div className="spacing" />

        <div className="infoTip">
          <h1>Activities</h1>
          {this.state.isActive === false ?
            <div className="infoTip">
              <img src={info} className='infoImg' />
              <h3>• To find the parks based on the activity you want to search, click on one of the activities below.</h3>
            </div>
            : null}
          {this.activityData.map((x) => (
            <div className="parkList">
              {(this.state.selectedID === x.id && this.state.isActive === true) ? <button onClick={() => this.switchButton(x.id)}>{x.name}</button> :
                <button onClick={() => this.getParksByActivity(x.id)}>{x.name}</button>}
              {(this.state.selectedID === x.id && this.state.isActive === true) ? this.ParksByActivityList[0].parks.map((x) => (
                <>
                  <Link to={`/parkinfo/${x.parkCode}`} style={{ textDecoration: 'none' }}> <button className="parkSelector">{x.fullName}</button></Link>
                </>)) : null}
            </div>

          ))}</div>
        <div className="spacing" />
      </div>
    );
  }

}
export default JSONTest;