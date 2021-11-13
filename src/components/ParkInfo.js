
import React,{Component} from 'react'
import {withRouter} from 'react-router';

class ParkInfo extends Component {
    APIkey = "&api_key=0kqZUVchxPk1ACNqc9wYSnJMLgOLWt7fm2Yd8D85";
    parkKey = "adam";
    ParkInfoVar = {};
    state = {
        //external states
        id : "",
        url : "",
        fullName : "",
        parkCode : "",
        description : "",
        latitude : "",
        longitude : "",
        activities : [],
        topics: [],
        states: "",
        contacts : {},
        entranceFees:[],
        entrancePasses:[],
        fees: [],
        directionsInfo: "",
        directionsUrl : "",
        operatingHours : [],
        addresses: [],
        images:[],
        weatherInfo:"",
        name : "",
        designation : "",
        
        //internal states (mainly used to help parse data)
        activitiesList: [],
        topicsList: [],
        phoneNumbers:[{}],
        emailAddresses:[{}],
      }
      

    constructor(props) {
        super(props);
        //check if there is a parkCode for park info
        if(this.props.match.path === "/parkinfo"){
        }else { 
            var x = this.props.match.path.substring(this.props.match.path.lastIndexOf('/')+1, this.props.match.path.length)
            if(x !== ""){
                this.parkKey = x
            }
        }
    }
    componentDidMount(){
        this.getParkInfo(this.parkKey);
    }

    getParkInfo(parkID) {
        var APIurl = "https://developer.nps.gov/api/v1/parks?parkCode="+String(parkID)+this.APIkey;
        fetch(APIurl)
        .then(response => response.json())
        .then(json => {
            this.ParkInfoVar = json.data[0];
            for (var i of Object.keys(this.ParkInfoVar)){
                this.setState(({
                    
                    [i]: this.ParkInfoVar[i],
                  }), () => {});
            }
            
            var temp = [];
            //Activities helper
            for (i = 0; i < this.state.activities.length; i++){
                temp.push(this.state.activities[i].name);
            }
            this.setState(({activitiesList: temp,}), () => {});
            
            //Related Topics helper
            temp = []
            for (i = 0; i < this.state.topics.length; i++){
                temp.push(this.state.topics[i].name);
            }
            this.setState(({topicsList: temp,}), () => {});

            //Phone Numbers helper
            temp = []
            for (i = 0; i < this.state.contacts.phoneNumbers.length; i++){
                temp.push(this.state.contacts.phoneNumbers[i]);
            }
            this.setState(({phoneNumbers: temp,}), () => {});
            
            //Emails helper
            temp = []
            for (i = 0; i < this.state.contacts.emailAddresses.length; i++){
                temp.push(this.state.contacts.emailAddresses[i]);
            }
            this.setState(({emailAddresses: temp,}), () => {});

        }); 
      }


    render(){
        return(
            
            <>
            <h1>{this.parkKey}</h1>
            
            <li>{this.state.fullName}</li>
            <li>{this.state.id}</li>
            <a href={this.state.url}>Go to website</a>
            <li>{this.state.description}</li>
            <li>Coordinates (Latitude, Longitude): {this.state.latitude}, {this.state.longitude}</li>
            <h1>Activities</h1> 
            {this.state.activitiesList.map((x) => (
            <>
                <li>{x}</li>
            </>
            ))}
            <h1>Topics related to this park</h1> 
            {this.state.topicsList.map((x) => (
            <>
                <li>{x}</li>
            </>
            ))}
            <h1>States</h1> 
            <li>{this.state.states}</li>
            <h1>Phone Numbers</h1>
            {this.state.phoneNumbers.map((x) => (
            <>
                <li>{x.type}: {x.phoneNumber}</li>
                <p>{x.description}</p>
            </>
            ))}
            <h1>Email Addresses</h1>
            {this.state.emailAddresses.map((x) => (
            <>
                <li>{x.emailAddress}</li>
            </>
            ))}

            <h1>Entrance Fees</h1>
            {this.state.entranceFees.map((x) => (
            <>
                <h3>{x.title}: ${x.cost} USD</h3>
                <h6>{x.description}</h6>
            </>
            ))}

            <h1>Entrance Passes</h1>
            {this.state.entrancePasses.map((x) => (
            <>
                <h3>{x.title}: ${x.cost} USD</h3>
                <h6>{x.description}</h6>
            </>
            ))}
            <li>{this.state.directionsInfo}</li>
            <a href={this.state.directionsUrl}>Directions URL</a>
            
            {this.state.operatingHours.map((x) => (
            <>
            <h2>Hours</h2>
            <p>{x.description}</p>
            {(x.standardHours.sunday !== "") ? <h5>Sunday: {x.standardHours.sunday}</h5> : null }
            {(x.standardHours.monday !== "") ? <h5>Monday: {x.standardHours.monday}</h5> : null }
            {(x.standardHours.tuesday !== "") ? <h5>Tuesday: {x.standardHours.tuesday}</h5> : null }
            {(x.standardHours.wednesday !== "") ? <h5>Wednesday: {x.standardHours.wednesday}</h5> : null }
            {(x.standardHours.thursday !== "") ? <h5>Thursday: {x.standardHours.thursday}</h5> : null }
            {(x.standardHours.friday !== "") ? <h5>Friday: {x.standardHours.friday}</h5> : null }
            {(x.standardHours.saturday !== "") ? <h5>Saturday: {x.standardHours.saturday}</h5> : null }
            <h3>Closed on these Exceptions</h3>
                {x.exceptions.map((y) => (
                <>
                <h5>From {y.startDate} to {y.endDate}: {y.name}</h5>
                </>
                ))}
            </>
            ))}

            <h1>Addresses</h1>
            {this.state.addresses.map((x) => (
            <>
                <h3>{x.title}: ${x.cost} USD</h3>
                <h6>{x.description}</h6>
            </>
            ))}

            <img src="pic_trulli.jpg" alt="Italian Trulli"></img>
            </>
        )
    }
}

export default ParkInfo;
