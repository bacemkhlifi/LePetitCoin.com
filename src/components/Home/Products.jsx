import React,{useEffect} from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import{ CardHeader,Grid,Button} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useState } from 'react';
import { Link,useHistory} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
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
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //get ads
  const [ads, setads] = useState([])
  useEffect(async() => {
      
    await axios.get("http://localhost:8089/v1/annonces").then(
        ((response)=>setads(response.data))
    )
  }, [ads])
//console.log(ads)
const [idAd, setidAd] = useState(0)
   
  
  return (
      <>

      <Grid container spacing={3}>
       
      {ads.map((ad)=>(   
      <Grid item lg={4}> 
    <Card className={classes.root} key={ad.id_ad}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            
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
       
       <br></br>
       prix : {ad.price} DT
          </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
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
        <Button onClick={()=>{ localStorage.setItem("id", JSON.stringify(ad.id_ad))
       // console.log(localStorage.getItem("id"))
    }
        }
        component={Link} to={"/anonnce"}
            
              >Voir plus </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          
          
          <Typography paragraph>
           {ad.description}
          </Typography>
          Livraison:   {ad.livraison}
        </CardContent>
      </Collapse>
    </Card>
    </Grid>
    ))}
    </Grid>
      
    </>
  );
}
