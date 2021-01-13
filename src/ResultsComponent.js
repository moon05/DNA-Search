import { blue, green } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CachedIcon from "@material-ui/icons/Cached";
import DoneIcon from "@material-ui/icons/Done";
import React from "react";
import "./App.css";
const useStyles = makeStyles((theme) => ({}));

function ResultsComponent({ status, time, location, name }) {
  const classes = useStyles();

  return (
    <Grid container xs={12} direction="column">
      <Grid
        item
        container
        xs={12}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid
          item
          xs={1}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography>
            {status ? (
              <DoneIcon style={{ color: green[500] }} />
            ) : (
              <CachedIcon style={{ color: blue[500] }} />
            )}
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography>{time}</Typography>
        </Grid>
        <Grid
          item
          xs={2}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography>{location}</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography> {name}</Typography>
        </Grid>
      </Grid>
      <Divider style={{ marginBottom: 10}}/>
    </Grid>
  );
}

export default ResultsComponent;
