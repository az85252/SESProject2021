import React, { Component } from 'react'

class ParkInfo extends Component {
    APIkey = "&api_key=0kqZUVchxPk1ACNqc9wYSnJMLgOLWt7fm2Yd8D85";
    parkKey = "acad";
    ParkInfoVar = {};
    state = {
        //external states
        id: "",
        url: "",
        fullName: "",
        parkCode: "",
        description: "",
        latitude: "",
        longitude: "",
        activities: [],
        topics: [],
        states: "",
        contacts: {},
        entranceFees: [],
        entrancePasses: [],
        fees: [],
        directionsInfo: "",
        directionsUrl: "",
        operatingHours: [],
        addresses: [],
        images: [],
        weatherInfo: "",
        name: "",
        designation: "",

        //internal states (mainly used to help parse data)
        activitiesList: [],
        topicsList: [],
        phoneNumbers: [{}],
        emailAddresses: [{}],
    }

    constructor(props) {
        super(props);
        //check if there is a parkCode for park info
        if (this.props.match.path === "/parkinfo") {
        } else {
            var x = this.props.match.path.substring(this.props.match.path.lastIndexOf('/') + 1, this.props.match.path.length)
            if (x !== "") {
                this.parkKey = x;
            }
        }
    }

    componentDidMount() {
        this.getParkInfo(this.parkKey);
    }

    getParkInfo(parkID) {
        var APIurl = "https://developer.nps.gov/api/v1/parks?parkCode=" + String(parkID) + this.APIkey;
        fetch(APIurl)
            .then(response => response.json())
            .then(json => {
                this.ParkInfoVar = json.data[0];
                for (var i of Object.keys(this.ParkInfoVar)) {
                    this.setState(({

                        [i]: this.ParkInfoVar[i],
                    }), () => { });
                }

                var temp = [];
                //Activities helper
                for (i = 0; i < this.state.activities.length; i++) {
                    temp.push(this.state.activities[i].name);
                }
                this.setState(({ activitiesList: temp, }), () => { });

                //Related Topics helper
                temp = []
                for (i = 0; i < this.state.topics.length; i++) {
                    temp.push(this.state.topics[i].name);
                }
                this.setState(({ topicsList: temp, }), () => { });

                //Phone Numbers helper
                temp = []
                for (i = 0; i < this.state.contacts.phoneNumbers.length; i++) {
                    temp.push(this.state.contacts.phoneNumbers[i]);
                }
                this.setState(({ phoneNumbers: temp, }), () => { });

                //Emails helper
                temp = []
                for (i = 0; i < this.state.contacts.emailAddresses.length; i++) {
                    temp.push(this.state.contacts.emailAddresses[i]);
                }
                this.setState(({ emailAddresses: temp, }), () => { });
                console.log(this.state)
            });
    }

    render() {
        return (
            <main className="parkInfo">
                <div className="spacing" />
                <div className="spacing" />
                <div className="infoTip">
                    <h1>{this.state.fullName}</h1>
                    <div className="infoSection">
                        <p>{this.state.description}</p>
                        <p>Coordinates (Latitude, Longitude): {this.state.latitude}, {this.state.longitude}</p>
                    </div>

                    <div className="infoSection">
                        <h1>Activities</h1>
                        <div className="whiteline" />
                        {this.state.activitiesList.map((x) => (
                            <li>{x}</li>
                        ))}
                    </div>

                    <div className="infoSection">
                        <h1>Topics related to this park</h1>
                        <div className="whiteline" />
                        {this.state.topicsList.map((x) => (
                                <li>{x}</li>
                        ))}</div>

                    <div className="infoSection">
                        <h1>Phone Numbers</h1>
                        <div className="whiteline" />
                        {this.state.phoneNumbers.map((x) => (
                            <>
                                <li>{x.type}: {x.phoneNumber}</li>
                                <p>{x.description}</p>
                            </>
                        ))}
                        <h1>Email Addresses</h1>
                        <div className="whiteline" />
                        {this.state.emailAddresses.map((x) => (
                                <li>{x.emailAddress}</li>
                        ))}
                    </div>

                    <div className="infoSection">
                        <h1>Entrance Fees</h1>
                        <div className="whiteline" />
                        {this.state.entranceFees.map((x) => (
                            <div className="infoSectionCenter"> 
                                <h3>{x.title}: ${x.cost} USD</h3>
                                <p>{x.description}</p>
                            </div>
                        ))}
                        <h1>Entrance Passes</h1>
                        <div className="whiteline" />
                        {this.state.entrancePasses.map((x) => (
                            <div className="infoSectionCenter"> 
                                <h3>{x.title}: ${x.cost} USD</h3>
                                <h6>{x.description}</h6>
                            </div>
                        ))}
                    </div>

                    <div className="infoSection">
                        <h1>Directions</h1>
                        <div className="whiteline" />
                        <p>{this.state.directionsInfo}</p>
                        <form action={this.state.directionsUrl} target="popup">
                        <button>More Info</button>
                        </form>
                    </div>

                    <div className="infoSection">
                        <h1>Hours </h1>
                        <div className="whiteline" />
                        {this.state.operatingHours.map((x) => (
                            <div className="infoSection"> 
                                <h1>{x.name}</h1>
                                <p>{x.description}</p>
                                {(x.standardHours.sunday !== "") ? <h5>Sunday: {x.standardHours.sunday}</h5> : null}
                                {(x.standardHours.monday !== "") ? <h5>Monday: {x.standardHours.monday}</h5> : null}
                                {(x.standardHours.tuesday !== "") ? <h5>Tuesday: {x.standardHours.tuesday}</h5> : null}
                                {(x.standardHours.wednesday !== "") ? <h5>Wednesday: {x.standardHours.wednesday}</h5> : null}
                                {(x.standardHours.thursday !== "") ? <h5>Thursday: {x.standardHours.thursday}</h5> : null}
                                {(x.standardHours.friday !== "") ? <h5>Friday: {x.standardHours.friday}</h5> : null}
                                {(x.standardHours.saturday !== "") ? <h5>Saturday: {x.standardHours.saturday}</h5> : null}
                                <h3>Closed on these Exceptions:</h3>
                                {x.exceptions.map((y) => (
                                    <>
                                        <h5>From {y.startDate} to {y.endDate}: {y.name}</h5>
                                    </>
                                ))}
                            </div>
                        ))}</div>

                    <div className="infoSection">
                        <h1>Addresses</h1>
                        <div className="whiteline" />
                        {this.state.addresses.map((x) => (
                            <div className="infoSection">
                                <h2>{x.type}</h2>
                                <div className="whiteline" />
                                {x.line1 !== "" ? <h4>{x.line1}</h4> : null}
                                {x.line2 !== "" ? <h4>{x.line2}</h4> : null}
                                {x.line3 !== "" ? <h4>{x.line3}</h4> : null}
                                <h4>{x.city}, {x.stateCode} {x.postalCode}</h4>
                            </div>
                        ))}</div>

                    <div className="infoSection">
                        <h1>Weather Information</h1>
                        <div className="whiteline" />
                        <p>{this.state.weatherInfo}</p>
                    </div>

                    <div className="infoSection">
                        <h1>Images</h1>
                        <div className="whiteline" />
                        {this.state.images.length > 0 ?
                            this.state.images.map((x) => (
                                <div className="imageSection">
                                    <h3>{x.title}</h3>
                                    <a href={x.url}>
                                        <img src={x.url} alt={x.altText}></img>
                                    </a>

                                    <p>{x.caption}</p>
                                    <i>{x.credit}</i>
                                </div>
                            ))
                            : <h2>No images provided!</h2>}
                    </div>
                    <form action={this.state.url} target="popup">
                    <button>More Info</button>
                    </form>
                </div>
                <div className="spacing" />
                <div className="spacing" />
            </main>
        )
    }
}

export default ParkInfo;
