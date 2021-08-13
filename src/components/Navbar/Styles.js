import { makeStyles ,fade  } from '@material-ui/core/styles'
const drawerWidth = 0;
export default makeStyles((theme)=>({
    appBar: {
      
      backgroundColor:'#f5f3f3',
        boxShadow: 'none',
        
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
        },
        
      },
      btnLogout:{
        display:"none"
    },
    bb:{
        
    },

      tabs:{
        marginRight: "8%",
      },
      tab:{
        fontSize:" 0.68rem",
        minHeight: "0",
        minWidth: "0",

      },
      btn:{
        marginLeft:"20px",
        backgroundColor: "#5d9a44",
        "&:active": {
          backgroundColor: "#5d9a44"
        },
      },
     
      title: {
         flexGrow: "1",
        alignItems: 'center',
        display: 'flex',
        color: "#5d9a44",
        textDecoration: 'none',
        "&:active": {
          color: "#5d9a44"
        },
        fontFamily: "'Coda Caption'",
        
      },
      image: {
        marginRight: '10px',
        width:'10%',
        height:'20%',
        cursor: "pointer",
      },
      menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      },
      grow: {
        flexGrow: 1,
      },
      
      shop:{
        color:'rgb(0,0,0)'
      },
      search:{
        marginRight:'5px'
      }, 
      
     
}))