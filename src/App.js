import { makeStyles } from "@material-ui/core/styles";
import './App.css';
import Main from "./Main";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#ffffff",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    marginTop: "20px"
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div>
      <Main/>
    </div>
  );
}


export default App;
