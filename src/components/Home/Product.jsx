import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography,Button ,TextField} from '@material-ui/core'
import { Room, Category,AccountCircle} from '@material-ui/icons'
import {useParams} from 'react-router-dom' 
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { red } from '@material-ui/core/colors';
import Modal from '@material-ui/core/Modal';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


  
export default function Product() {
const classes = useStyles();

    const [ad, setad] = useState([])
      const params = useParams()
     // console.log(params)
    useEffect( () => {

         axios.get("http://localhost:8089/v1/annonce/"+params.id).then(
            ((response) => setad(response.data))
        
        ) 
        
    }, [ad])
    const [name, setname] = useState({
        name:"",
       
    })
    const [phone, setphone] = useState({
        phone:""
    })
    const [email,setemail]= useState({
        email:""
    })
    const getData=()=>{
        setname((Object.assign({}, name, {name:(ad.user)[1] })));
        setphone((Object.assign({}, phone, {phone: "Numéro:" + (ad.user)[2] })))
        setemail((Object.assign({}, email, {email:  (ad.user)[0] })))
    }
    
 //console.log(ad)
 const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
//startModal
const [modalStyle] = React.useState(getModalStyle);
const [open, setOpen] = React.useState(false);
const handleOnchangeAd = (e)=> { setUpdateAd((Object.assign({}, UpdateAd, {[e.target.name]: e.target.value})))}




const [UpdateAd, setUpdateAd] = useState({
 message:""
})
const body = (
  <div style={modalStyle} className={classes.paper}>
    <h2 id="simple-modal-title"> Envoyer un message  </h2>
    <p id="simple-modal-description"> </p>

    <TextField
          required
          id="nom"
          name="message"
          label="Ecrivez ici"
          fullWidth
          autoComplete="given-name"
          onChange={handleOnchangeAd}
        />
       
   <Button variant="outlined" onClick={()=>{
       const userEmail = JSON.parse(localStorage.getItem("currentUser")).email;
     axios.post("http://localhost:8089/v1/send/"+userEmail+"/"+email.email,
     {
       "message":UpdateAd.message,
     
     }
     )
     setOpen(false)}}>envoyer</Button>
  </div>
);
///endModal
  


    /////////
    return (
        <>
            <Container style={{ "marginTop": "150px" }}>
                <Grid container spacing={3}>
                    <Grid item lg={8}>

                       <img style={{
                           height:"350px",
                           width:"750px"
                       }} src={process.env.PUBLIC_URL+"/fileAds/"+ad.photo} />
                       <br />
                       <Typography variant="subtitle2"> Description :  </Typography>
                       <br />
                       {ad.description} 
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
      }}
      disabled={(localStorage.getItem("currentUser")==null)? true : false}
      onClick={()=>{getData()
      setOpen(true)}} >Discuter</Button>
                        </Grid>
                </Grid>
            </Container>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal> 
        </>
    )
}
