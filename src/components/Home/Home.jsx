import React, { useEffect, useState } from 'react'
import { Typography,Collapse,Avatar,CardActions,CardMedia,CardHeader,Button, TextField, Grid, Container, FormControl, InputLabel, ListSubheader, Select, Card, MenuItem, CardContent } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';

import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Link,useHistory} from 'react-router-dom'
import Pricing from './Pricing';

import axios from 'axios'
import useStyles from './Styles.js'
import Reclamation from './Reclamation';
const Home = () => {
 
    const classes = useStyles()
    const [ads, setads] = useState([])
    const [categories, setcategories] = useState([])
    // get all adsences
    useEffect(async () => {
        await axios.get("http://localhost:8089/v1/annonces").then(res => setads(res.data))
    }, [ads])

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    ///get all categories
    useEffect(async () => {
        await axios.get("http://localhost:8089/v1/categories").then(res => setcategories(res.data))
    }, [categories])
    
    const [state, setState] = useState("Tout la Tunisie");
    const [ville, setVille] = useState([])

    const [region, setregion] = useState("")
    const [souscateg, setsouscateg] = useState("")

    useEffect(async() => {
        await axios.get("http://localhost:8089/v1/villes").then(res => setVille(res.data))
        const json = JSON.stringify(state);
        localStorage.setItem("villeSearch",json) ;
        const json1 = JSON.stringify(region);
        localStorage.setItem("regionSearch",json1) ;
        const json2 = JSON.stringify(souscateg);
        localStorage.setItem("souCategSearch",json2) ;
    }, [ville])

      const handleChange = (event) => {
        setState(event.target.value);
              
      };
     
      //searching 
      const [search, setsearch] = useState("")
      const handleChangeRegion =(event) =>{
        setregion(event.target.value);
    }
    const handleChangeSouscateg =(event) =>{
        setsouscateg(event.target.value);
    }
//console.log(JSON.parse((localStorage.getItem("villeSearch"))))

 
    return (
        <>


            <div className={classes.bgImg} style={{ backgroundImage: "linear-gradient( rgba(0, 0, 0, 0.33), rgba(0, 0, 0, 0.33) ),url('/background-studio-living.jpg')" }}>
                <div className={classes.home} >
                    <Typography variant="h3" className={classes.title}>Parcourir les petites annonces </Typography>
                    <p className={classes.p}>Trouvez la bonne affaire.</p>
                    <div style={{ width: "35vw" }}>
                        <div className={classes.root}>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>

                                    <Autocomplete
                                        id="free-solo-demo"
                                        freeSolo
                                        options={ads.map((option) => option.name)}

                                        renderInput={(params) => (

                                            <TextField className={classes.search} {...params} label="Que cherchez-vous?" margin="dense" variant="filled" >


                                            </TextField>


                                        )}

                                    />

                                    <IconButton>
                                        <SearchIcon style={{
                                            "color": "white",
                                            "marginLeft": "930px",
                                            "marginTop": "-70px"
                                        }} />
                                    </IconButton>
                                </Grid>
                            </Grid>

                        </div>
                    </div>
                </div>


            </div>
            <Container>
                <Typography style={{
                    "marginTop": "30px",
                    "fontWeight": "600",
                    "fontSize": "28px",
                    "textAlign": "center",
                    "lineHeight": "1.3",
                    "marginBottom": "20px",

                }}> Ou choisissez l'un de nos marchés</Typography>
                <Container maxWidth="md">
                    <Grid container >


                        <Grid item >
                            <Card className={classes.root}>
                                <CardContent>
                                    {categories.map((categ) => (
                                        <FormControl className={classes.formControl} style={{
                                            "minWidth": "250px"
                                        }}>
                                            <InputLabel htmlFor="grouped-native-select">{categ.name}</InputLabel>
                                            <Select native defaultValue="" id="grouped-native-select"
                                             value={souscateg}
                                             onChange={handleChangeSouscateg}
                                           
                                            
                                            >
                                                <option aria-label="None" value="" />
                                                <optgroup label={categ.name}>
                                                    {categ.subCategory.map((subcat) => (
                                                        <option value={subcat.name}>{subcat.name} </option>
                                                    ))}


                                                </optgroup>

                                            </Select>
                                        </FormControl>
                                    ))}

                                 
                                </CardContent>


                            </Card>
                        </Grid>

                    </Grid>

                </Container>
                <Grid container style={{ "marginTop": "30px" }}>


                    <Grid item lg={3}>

                        <Grid container >


                            <Grid item >
       <FormControl className={classes.formControl}   style={{"minWidth": "250px"}}>
        <Typography >Gouvernorat:</Typography>
        
       <Select
          native
          value={state}
          onChange={handleChange}
        
        >
             <option  value="Tout la Tunisie">Tout la Tunisie </option>
        {ville.map((gov)=>(    
            <option value={gov.name}  >{gov.name}</option>
        ))}
        </Select>  
      </FormControl>
                            </Grid>
                            <Grid item >
       <FormControl className={classes.formControl}   style={{"minWidth": "250px"}}>
        <Typography >Délégation:</Typography>
        
       <Select
          native
          value={region}
          onChange={handleChangeRegion}
        
        >
            <option aria-label="None" value="" />
               {ville.map((gov)=>{
                if(gov.name==state)
                return (
                   gov.region.map((reg)=>(  
                       
            <option value={reg.name} >{reg.name}</option>
           ) )) 
        })}
        </Select>  
      </FormControl>
                              </Grid>

                            

                        </Grid>
                    </Grid>
 
                    <Grid item lg={9}>
                    <Grid container spacing={3}>
       
       {ads.map((ad)=>{
        if((JSON.parse(localStorage.getItem("villeSearch")) =="Tout la Tunisie" || JSON.parse(localStorage.getItem("villeSearch")) ==ad.ville)
        && (JSON.parse(localStorage.getItem("regionSearch")) =="" || JSON.parse(localStorage.getItem("regionSearch")) ==ad.region)
      && (JSON.parse(localStorage.getItem("souCategSearch")) ==""|| JSON.parse(localStorage.getItem("souCategSearch")) ==ad.subCategory)
        )
    {
 return  (
       
       <Grid item lg={4}  id="card"> 
  
     <Card className={classes.root} key={ad.id_ad} >
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
         <Button 
         component={Link} to={"/annonce/"+ad.id_ad}
             
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
) }})}
     </Grid>

                  

                    </Grid>
                </Grid>
                <hr></hr>
                <Reclamation />
                <Pricing />
            </Container>





        </>

    )
}



export default Home;
