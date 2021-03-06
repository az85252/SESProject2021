
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import info from '../images/info.png';
import { isMobile } from 'react-device-detect';

class Activity extends Component {

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
          this.setSelectedID(activityID);
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
        <div className="infoSectionCenter">
          <h1>Activities</h1>
          {this.state.isActive === false ?
            <div className="infoSectionCenter" >
              <img src={info} className='infoImg' alt=""/>
              <h3>To find the parks based on the activity you want to search, click on one of the activities below.</h3>
            </div>
          : null}
          {this.activityData.map((x) => (
            <div>
              {(this.state.selectedID === x.id && this.state.isActive === true)
                ?
                <button style={isMobile ? { width: "100%" } : {}} onClick={() => this.switchButton(x.id)}>{x.name}</button>
                :
                <button style={isMobile ? { width: "100%" } : {}} onClick={() => this.getParksByActivity(x.id)}>{x.name}</button>
              }
              {(this.state.selectedID === x.id && this.state.isActive === true) ?
                <div className="dropDownParks" style={isMobile ? { width: "90%" } : {}}>
                  {this.ParksByActivityList[0].parks.map((x) => (
                    <>
                      <Link to={`/parkinfo/${x.parkCode}`} style={{ textDecoration: 'none' }}>
                        <button className="parkSelector">{x.fullName}</button></Link>
                    </>
                    ))
                  }
                </div>
              : null}
            </div>
            ))
          }</div>
        <div className="spacing" />
      </div>
    );
  }

}
export default Activity;