import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import "./App.css";
import ResultsList from "./ResultsList";
import SearchComponent from "./SearchComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  searchBox: {
    display: "flex",
    position: "fixed",
    top: 300,
    left: 0,
    right: 0,
  },
}));

function Main() {
  const classes = useStyles();
  const [listUpdate, setListUpdate] = useState(false);

  return (
    <Grid
      item
      container
      xs={12}
      direction="row"
      justify="center"
      alignItems="center"
      style={{ marginTop: 20 }}
    >
      <Grid
        item
        container
        xs={5}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={12}>
          <SearchComponent setListUpdate={setListUpdate} />
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={6}
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
        <Grid item xs={12}>
          <ResultsList k={listUpdate} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Main;
