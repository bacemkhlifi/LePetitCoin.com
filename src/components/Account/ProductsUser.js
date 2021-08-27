import React,{useEffect} from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import{ CardHeader,Grid,Button,TextField} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { useState } from 'react';
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

export default function RecipeReviewCard() {
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
      <h2 id="simple-modal-title"> Modifier l'annonce </h2>
      <p id="simple-modal-description"> </p>

      <TextField
            required
            id="titre"
            name="name"
            label="Titre de votre annonce"
            fullWidth
            autoComplete="given-name"
            onChange={handleOnchangeAd}
          />
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            autoComplete="given-name"
            onChange={handleOnchangeAd}
          />
           <TextField
            required
            id="price"
            name="price"
            label="Prix"
            fullWidth
            autoComplete="given-name"
            onChange={handleOnchangeAd}
          />
     <Button variant="outlined" onClick={()=>{
       axios.put("http://localhost:8089/v1/annonce/update/"+(JSON.parse(localStorage.getItem("IdAdUpdate"))),
       {
         "name":UpdateAd.name,
         "description":UpdateAd.description,
         "price":UpdateAd.price
       }
       )
       setOpen(false)
      
       
       }}>Modifier</Button>
    </div>
  );
///endModal

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  //get ads
  const [ads, setads] = useState([])
  useEffect(async() => {
    const userEmail = JSON.parse(localStorage.getItem("currentUser")).email;
     
    await axios.get("http://localhost:8089/v1/user/annonce/"+userEmail).then(
        ((response)=>setads(response.data.annonces))
    )
  }, [ads])
//console.log(ads)
  return (
      <>

      <Grid container spacing={3}>
       
      {ads.map((ad)=>(   
      <Grid item lg={4}> 
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={(ad.user)[1]}
        subheader={(ad.user)[2]}
      />
      <CardMedia
        className={classes.media}
        image={process.env.PUBLIC_URL+"/fileAds/"+ad.photo}
        title={ad.name}
      />
      <CardContent>
        <Typography variant="h6" color="textSecondary" component="p">
         {ad.name}
         <br />
        Prix : {ad.price} DT
          </Typography>
      </CardContent>
      <CardActions disableSpacing>
       
        <IconButton aria-label="share"
         onClick={() =>{  navigator.clipboard.writeText('http://localhost:3000/annonce/'+ad.id_ad)
         
         alert('Lien copié dans le presse-papiers') }
        }

        >
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        <IconButton
        onClick={()=>{
          setOpen(true);
          const json = JSON.stringify(ad.id_ad);
          localStorage.setItem("IdAdUpdate",json)
        }}
        >
          <CreateIcon />
        </IconButton>
        <IconButton
         
         onClick={()=>{axios.post("http://localhost:8089/v1/annonce/delete/"+ad.id_ad)
         window.location.reload()}}>
          <DeleteIcon style={{color:"red"}} />
          </IconButton>
        
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          
          
          <Typography paragraph>
           {ad.description}
          </Typography>
         
        </CardContent>
      </Collapse>
    </Card>
    </Grid>
    ))}
    </Grid>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal> 
    </>
  );
}
