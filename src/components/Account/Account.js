import React, { useState,useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Typography,TextField, Container, Grid, Button, CardContent, Card, CardActions, Paper, Table, TableCell, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { ThumbUp, Notifications, Drafts, AccountBox, LocationOn, DateRange, Phone, LocalHospital, PictureAsPdf } from '@material-ui/icons'
import axios from 'axios';
import ProductsUser from './ProductsUser'

import { makeStyles } from '@material-ui/core/styles';
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
    Rtitle: {
        fontSize: "32px",
        textAlign: "center",
        textTransform: " uppercase",
        fontStyle: "normal",
        fontWeight: "bold",
        position: "relative",
        borderBottom: "none",
        color: " #00927b",
        marginBottom: "15px",


    },
    icons: {

        margin: "0px 20%",
        color: "#00927b"
    },
    card: {
        backgroundColor: "#00927b2e"
    }

}))
export default function  Account()  {

const classes = useStyles();

//startModal
const [modalStyle] = React.useState(getModalStyle);
const [open, setOpen] = React.useState(false);
const handleOnchangeAd = (e)=> { setUpdateAd((Object.assign({}, UpdateAd, {[e.target.name]: e.target.value})))}

const handleOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};


const [UpdateAd, setUpdateAd] = useState({
  name:"",
  description:"",
  price:""
})
const body = (
  <div style={modalStyle} className={classes.paper}>
    <h2 id="simple-modal-title"> Modifier Mes informations  </h2>
    <p id="simple-modal-description"> </p>

    <TextField
          required
          id="nom"
          name="nom"
          label="Nom"
          fullWidth
          autoComplete="given-name"
          onChange={handleOnchangeAd}
        />
        <TextField
          required
          id="Prénom"
          name="prenom"
          label="Prénom"
          fullWidth
          autoComplete="given-name"
          onChange={handleOnchangeAd}
        />
         <TextField
          required
          id="phone"
          name="telephone"
          label="Téléphone"
          fullWidth
          autoComplete="given-name"
          onChange={handleOnchangeAd}
        />
   <Button variant="outlined" onClick={()=>{
       const userEmail = JSON.parse(localStorage.getItem("currentUser")).email;
     axios.put("http://localhost:8089/v1/user/update/"+userEmail,
     {
       "nom":UpdateAd.nom,
       "prenom":UpdateAd.prenom,
       "telephone":UpdateAd.telephone
     }
     )
     setOpen(false)}}>Modifier</Button>
  </div>
);
///endModal
  const [state,setState]  = useState({
    fullName: "bacem null",
    telephone: "22780333",
    sexe: "",
    date_insc: "",
    datenaissance: "",
   
    ville: "",
    region: "",
    email: "",
    
   
    annonces: [],
   
    })

useEffect( () => {
    const userEmail = JSON.parse(localStorage.getItem("currentUser")).email;
      
      axios.get('http://localhost:8089/v1/user/annonce/'+userEmail).then((res)=>(
        setState(res.data)
    ))
}, [state])
    
    
        return (
            <>

                <Container maxWidth="md" >

                    <div style={{ marginTop: "105px" }}>

                    </div>



                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"

                    >

                        <Grid item lg={4}  >
                            <Drafts className={classes.icons} />
                            <Typography variant="subtitle2">  <br /> Transmettez votre adresse email<br />
                                au LePetitCoin puis activez votre <br />
                                compte en quelques clics.</Typography> </Grid>
                        <Grid item lg={4}>
                            <Notifications className={classes.icons} />
                            <Typography variant="subtitle2"> <br /> Soyez alerté par
                                email lorsque <br />
                                vos résultats sont disponibles.</Typography> </Grid>


                        <Grid item lg={4}  >
                            <ThumbUp className={classes.icons} />
                            <Typography variant="subtitle2">  <br /> C’est simple, sécurisé
                                et écologique.</Typography> </Grid>

                    </Grid>

                    <Grid container >
                        <Grid item lg={12}>
                            <Card className={classes.card}>

                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" variant="h4" >

                                    </Typography>
                                    <Typography variant="h6" component="h2">
                                        <AccountBox />  (Mr/Mme): {state.fullName}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        <DateRange />   Date de naissance:  {state.datenaissance}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        <LocationOn /> Adresse: {state.ville} , {state.region}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        <Phone />   téléphone:  {state.telephone}
                                    </Typography>

                                    <Typography className={classes.pos} color="textSecondary">
                                        <LocalHospital />   Numbre des annonces publiées: {state.annonces.length}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" 
                                    style={{
                                        "backgroundColor": "#5d9a44",
                                        "&:active": {
                                          "backgroundColor": "#5d9a44",
                                        },
                                         "color":"white",
                                    }}
                                    onClick={()=> {setOpen(true)}}
                                    >Modifier mes informations</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item lg={6}>
                            <TableContainer component={Paper}>

                            </TableContainer>
                        </Grid>
                    </Grid>
                    <Typography variant="h6" className={classes.Rtitle}>Mes Annonces({state.annonces.length})</Typography>
                        <ProductsUser />
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