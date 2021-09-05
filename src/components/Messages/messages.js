import React, { useEffect, useState } from 'react'
import { Container, Grid,Button, Typography,TextField,ListItemText,InputFiled ,Card,List,ListItem,CardContent,} from '@material-ui/core'
import { Room, Category,AccountCircle} from '@material-ui/icons'
import axios from 'axios'
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
      },
 
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Product() {
    const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
 
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const [nom, setnom] = useState()
  const [msg, setmsg] = useState([
    { name_e: "", email_e: "", email_r: "", message: ""}
  ])
  const [message, setmessage] = useState({
      name_e:"e",
      message:""
      
  })
  useEffect(async() => {
    await  axios.get("http://localhost:8089/v1/message/"+JSON.parse(localStorage.getItem("currentUser")).email).then((res)=>setmsg(res.data))
    

    
    }, [msg])
    useEffect(async() => {
        await  axios.get("http://localhost:8089/v1/messages/"+selectedIndex).then((res)=>setmessage(res.data))
     
       
         }, [message])
   
 console.log(JSON.parse(localStorage.getItem("currentUser")).email)
   console.log(msg)
    const classes = useStyles();
    return (
        <>
            <Container style={{ "marginTop": "150px" }}>
                <Grid container spacing={3}>
                     
                <Container maxWidth="lg" className={classes.container}>
         <Grid container>
            <Grid item lg={3} >
          
      <Divider />
      
      <List component="nav" aria-label="secondary mailbox folder">
       
         
          {msg.map((rec)=>( 
       <ListItem
          button
          selected={selectedIndex === rec.id}
          onClick={(event) => handleListItemClick(event,rec.id )}
        >
         <ListItemText primary={rec.name_e} />
        </ListItem>
        ))}
      </List>
                
                
                 </Grid>

            <Grid item  >
                <Card>
                    <CardContent  style={{  "minWidth": "750px",
                                            "minHeight":"70vh"}}>
                        <Typography variant="h6"
                        style={{}}
                        >Boite messagerie </Typography>
                            <p>{(message==null)?  "" :message.name_e  } : {(message==null)?  "" :message.message} </p>

                            <TextField
            required
            id="message"
            name="msg"
            label="Ecrivez votre message ici"
            multiline
          rows={4}
            fullWidth
            autoComplete="given-name"
           // onChange={handleOnchangeAd}
          />
          <Button color="primary"  outlined >Envoyer</Button>
                    </CardContent>

                </Card>
                
                
                </Grid>     
             
        </Grid> 
            
          
         
        </Container>

                </Grid>
            </Container>

        </>
    )
}
