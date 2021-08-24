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
import Products from './Products'
import axios from 'axios'
import useStyles from './Styles.js'
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
console.log(JSON.parse((localStorage.getItem("villeSearch"))))
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
       
       {ads.map((ad)=>(   
       <Grid item lg={4}> 
       <div className={(JSON.parse(localStorage.getItem("villeSearch")) !="Tout la Tunisie" && JSON.parse(localStorage.getItem("villeSearch")) !=ad.ville)?   `${classes.hide}`:`${classes.show}`}>
       <div className={(JSON.parse(localStorage.getItem("regionSearch")) !="" && JSON.parse(localStorage.getItem("regionSearch")) !=ad.region)?   `${classes.hide}`:`${classes.show}`}>
       <div className={(JSON.parse(localStorage.getItem("souCategSearch")) !="" && JSON.parse(localStorage.getItem("souCategSearch")) !=ad.subCategory)?   `${classes.hide}`:`${classes.show}`}>
 
     <Card className={classes.root} key={ad.id_ad}      >
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
     </div></div></div>
     </Grid>
     ))}
     </Grid>

                  

                    </Grid>
                </Grid>
                <Pricing />
            </Container>





        </>

    )
}

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
];

export default Home;
