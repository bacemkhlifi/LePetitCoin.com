import { makeStyles } from '@material-ui/core/styles';
export default   makeStyles((theme) => ({
    
    bgImg:{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: "100vh",
        
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
