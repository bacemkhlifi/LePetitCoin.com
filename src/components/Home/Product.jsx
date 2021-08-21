import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography,Button ,CardHeader} from '@material-ui/core'
import { Room, Category,AccountCircle} from '@material-ui/icons'
import axios from 'axios'
export default function Product() {
    const [ad, setad] = useState([])
      
    useEffect( () => {

         axios.get("http://localhost:8089/v1/annonce/"+localStorage.getItem("id")).then(
            ((response) => setad(response.data))
        
        ) 
        
    }, [ad])
    const [name, setname] = useState({
        name:"",
       
    })
    const [phone, setphone] = useState({
        phone:""
    })
    const getData=()=>{
        setname((Object.assign({}, name, {name:(ad.user)[1] })));
        setphone((Object.assign({}, phone, {phone: "Numéro:" + (ad.user)[2] })))
 
    }
    
 //console.log(ad)
    return (
        <>
            <Container style={{ "marginTop": "150px" }}>
                <Grid container spacing={3}>
                    <Grid item lg={8}>

                       <img style={{
                           height:"350px",
                           width:"750px"
                       }} src={process.env.PUBLIC_URL+"/fileAds/"+ad.photo} />
                    </Grid>
                    <Grid item lg={4} >
                    <Typography style={{    
                        "fontSize": "21px",
                        "fontWeight": "700",
                        "marginBottom": "10px"
                        }}>
                            {ad.price} DT
                        </Typography>
                        <Typography style={{
                                "marginTop": "25px",
                                "fontSize": "20px",
                                "fontWeight": "500",
                                "marginBottom": "10px",
                                "lineHeight": "30px",
                        }}>
                            {ad.name}
                        </Typography>
                        <Typography variant="subtitle2">
                            Publié le :    {ad.date}
                        </Typography>
                        <hr></hr>
                        <div style={{
                            "display": 'flex',
                            "flexDirection": "row",
                            "fontSize": "17px",
                            "paddingTop": "5px",
                            "paddingLeft": "10px",
                            "color": "#555770",
                        }}> <Room /> <Typography >{ad.ville} , {ad.region}</Typography>
                        </div>
                        <br></br>
                        <div style={{
                            "display": 'flex',
                            "flexDirection": "row",
                            "fontSize": "17px",
                            "paddingTop": "5px",
                            "paddingLeft": "10px",
                            "color": "#555770",
                        }}>     <Category />  <Typography >{ad.category} , {ad.subCategory}</Typography>
                        </div> 
                        <hr></hr>
                        <div style={{
                            "display": 'flex',
                            "flexDirection": "row"
                        }}>       <AccountCircle fontSize="large" /> 
                     <Button onClick={()=>{getData()}}> Afficher la suite : 
                         <br></br>
                         {name.name} 
                         <br></br>
                         {phone.phone}
                         
                         </Button>  
                     
                        </div>
                        <br></br>
                        <Button variant="contained"  style={{
        "padding":"0 ,290px",
        "backgroundColor": "#5d9a44",
        "&:active": {
          "backgroundColor": "#5d9a44",
        },
         "color":"white",
          "paddingInline": "120px",
      }} >Discuter</Button>
                        </Grid>
                </Grid>
            </Container>

        </>
    )
}
