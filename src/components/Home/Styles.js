import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
export default   makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  hide:{
    display:"none",
    order: "2",
   webkitOrder: "2"
    
  },
  show:{
    position:"relative",
   
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
    bgImg:{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: "100vh",
        
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    home: {
    
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
  },
  title:{
    textAlign: "center",
    color: "white",
    position: "relative",
    marginTop: "190px",
    lineHeight: "1.22",
    fontFamily: '"Poppins-Bold",sans-serif',
    fontWeight: "700",
},
p:{
    fontSize: "18px  !important",
    color: "#fff",
},
search:{
    marginLeft:"95%",
    backgroundColor:"white"
}
,  
root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

}))
