import React,{Component} from "react"
import { useState } from "react"

class ParseParks extends Component {
    APIkey = "&api_key=0kqZUVchxPk1ACNqc9wYSnJMLgOLWt7fm2Yd8D85";
    dict = {}
    constructor(props) {
        super(props);
        this.state = {
            parks : {},
            limit : "50",
        };
      }

    
      getParkNamesAndIDs() {
        var temp = []
        var temp2 = {}
        var APIurl = "https://developer.nps.gov/api/v1/parks?limit=1000"+this.APIkey;
        fetch(APIurl)
        .then(response => response.json())
        .then(json => {
            temp = json.data;
            for (var i = 0; i < temp.length; i++){
                this.dict[temp[i].fullName] = temp[i].parkCode;
                temp2[temp[i].fullName] = temp[i].parkCode;
            }
            return 9;
        }); 
        
      }
}

export default ParseParks;