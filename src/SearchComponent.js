import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  searchBox: {
    display: "flex",
    position: "fixed",
    top: 240,
    left: 50,
    right: 0,
  },
  stayHidden: {
    visibility: "hidden",
  },
  show: {
    visibility: "visible",
  },
}));

function SearchComponent({ setListUpdate }) {
  const classes = useStyles();

  const [searchWord, setSearchWord] = useState();
  const [searchResult, setSearchResult] = useState({});
  const [vanishText, setVanishText] = useState(false);

  useEffect(() => {
    window.onload = (e) => {
      setVanishText(true);
    };
  }, []);

  const fetchURL = `http://167.99.150.45:3040/dnatoprotein/relax?q=${encodeURIComponent(
    searchWord
  )}`;

  function handleTextFieldChange(e) {
    setSearchWord(e.target.value);
  }

  function sleepAndVanish() {
    setVanishText(true);
  }
  function handleSearchButton(e) {
    document.getElementById("dna-textField-input").value = "";
    setVanishText(false);
    fetch(fetchURL, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        if (data === undefined) {
          //In case something goes wrong
          console.log("Undefined Data");
        } else {
          setSearchResult(data);
          const d = new Date().toLocaleString(); // 11/16/2015, 11:18:48 PM
          data.time = d;
          if (Number(data.success) === 0) {
            setSearchResult(0);
          } else {
            const localStorageObject = localStorage.getItem(
              "proteinSearchData"
            );
            if (localStorageObject === null) {
              const newObject = { 0: data };
              localStorage.setItem(
                "proteinSearchData",
                JSON.stringify(newObject)
              );
              setListUpdate(true);
            } else {
              const parsedObject = JSON.parse(localStorageObject);
              const len = Object.keys(parsedObject).length;
              parsedObject["" + len] = data;

              localStorage.setItem(
                "proteinSearchData",
                JSON.stringify(parsedObject)
              );
              setListUpdate(true);
            }
          }
          setListUpdate(false);
          setTimeout(sleepAndVanish, 3000);
        }
      });
  }

  return (
    <Grid
      item
      container
      xs={4}
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.searchBox}
    >
      <Grid
        item
        container
        xs={11}
        direction="row"
        alignItems="center"
        justify="center"
      >
        <FormControl fullWidth>
          <InputLabel htmlFor="dna-textField-input">
            Enter Sequence Here
          </InputLabel>
          <Input id="dna-textField-input" onChange={handleTextFieldChange} />
          {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
        </FormControl>
      </Grid>
      <Grid
        item
        container
        xs={11}
        direction="row"
        alignItems="center"
        justify="center"
        style={{ marginTop: 40, marginLeft: 30 }}
      >
        <Button
          variant="contained"
          color="primary"
          type="submit"
          value="Submit"
          size="large"
          onClick={handleSearchButton}
        >
          Search
        </Button>
      </Grid>
      <Grid
        item
        container
        xs={11}
        justify="center"
        alignItems="center"
        className={vanishText ? classes.stayHidden : classes.show}
        style={{ marginTop: 10 }}
      >
        {searchResult === 0 ? (
          <Typography>Sorry we couldn't find a match! Try again!</Typography>
        ) : (
          <Typography>
            The DNA Sequence you provided was found at location
            {searchResult.match_loc} in the {searchResult.name}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default SearchComponent;
