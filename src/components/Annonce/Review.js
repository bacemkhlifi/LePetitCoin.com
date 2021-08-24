import React, { Component } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, Button, ListItem, withStyles,CardMedia,CardActionArea,Card } from '@material-ui/core';
import axios from 'axios'
import {withRouter} from 'react-router-dom';



 class UploadImages extends Component {
  state={
    selectedFile: null
  }
  state= {
    imagePreview:null
  } 
  fileSelectorHandler= event =>{
    this.setState ({
      selectedFile : event.target.files[0]
    })
    this.setState({
      imagePreview:(URL.createObjectURL(event.target.files[0]))
    })
  }
  


 
createAd = () =>{
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
fd );



  this.props.history.push("/");



 
 

   
}
  render() {
   // console.log(localStorage.getItem("annonce"))
    return (
    <>
     <Card>
                        <CardActionArea>
                            <CardMedia  style={{
                              height:"100%",
                              width:"100%"
                            }}
                                component="img"
                                image={
                                    this.state.imagePreview !== null ?
                                        this.state.imagePreview :
                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFKwpAYLdgVvhphi1bbppMkQhSmYHBJ2OtpRAVqVuocx5qoXzuHcNjGWHjXBRGJR9uoHM&usqp=CAU"}
                            />
                        </CardActionArea>
                    </Card>
        <input type="file" onChange={this.fileSelectorHandler} ></input>
       
        <br></br>
        <Button onClick={this.createAd} variant="contined"
        style={{
          "backgroundColor": "#5d9a44",
        "&:active": {
          "backgroundColor": "#5d9a44",
        },
         "color":"white",
         marginTop:"35px",
         paddingInline:"45px"
          
        }}> Publier </Button>
      </>
    );
  }
}
export default withRouter (UploadImages)