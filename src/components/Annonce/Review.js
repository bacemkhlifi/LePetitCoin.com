import React, { Component } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, Button, ListItem, withStyles } from '@material-ui/core';
import axios from 'axios'
import UploadService from "../Annonce/Services/upload-files.service";

export default class UploadImages extends Component {
  state={
    selectedFile: null
  }
  fileSelectorHandler= event =>{
    this.setState ({
      selectedFile : event.target.files[0]
    })
  }

  uploadFileHandler =()=>{
const fd = new FormData;
fd.append("file",this.state.selectedFile)
//axios.post("http://localhost:8089/v1/upload",fd).then(res =>{console.log(res)})
console.log(fd)
const annoncePerfectLast = JSON.parse(localStorage.getItem("annonce"))
annoncePerfectLast.PhotoData=fd
console.log(annoncePerfectLast)
 
  } 

 
createAd = ()=>{
  const fd = new FormData;
fd.append("file",this.state.selectedFile)
const annoncePerfectLast = JSON.parse(localStorage.getItem("annonce"))


const fd1 = new FormData;
fd1.append("ads",{
  "name":annoncePerfectLast.name,
  "ville":annoncePerfectLast.ville,
  "region":annoncePerfectLast.region,
  "description":annoncePerfectLast.description,
  "price":annoncePerfectLast.price,
  "livraison":annoncePerfectLast.livraison,
  
})
  axios.post("http://localhost:8089/v1/add/ads/"+JSON.parse(localStorage.getItem("currentUser")).email+"/"
  +annoncePerfectLast.subcat+"/"+annoncePerfectLast.name+"/"+annoncePerfectLast.price+"/"
  +annoncePerfectLast.ville+"/"+annoncePerfectLast.region+"/"+annoncePerfectLast.description+"/"
  +annoncePerfectLast.livraison,
fd )
 
 

   
}
  render() {
   // console.log(localStorage.getItem("annonce"))
    return (
    <>
        <input type="file" onChange={this.fileSelectorHandler} ></input>
        <Button onClick={this.uploadFileHandler}> Upload</Button>
        <br></br>
        <Button onClick={this.createAd}> Publier </Button>
      </>
    );
  }
}