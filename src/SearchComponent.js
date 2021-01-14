import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import "./App.css";
import gLogo from "./ginkgo.svg";


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
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isError, setIsError] = useState(false);
  const [inputHelperText, setInputHelperText] = useState("");

  useEffect(() => {
    window.onload = (e) => {
      setVanishText(true);
    };
  }, []);

  useEffect(() => {
    window.onload = (e) => {
      setVanishText(true);
    };
  }, []);

  // My backend stuff is hosted in a droplet in DigitalOcean and turns out certbot doesn't
  // let you have https over an IP address, hence I am going with http. Similary as you will
  // see in the Heroku app it's also http since they don't mix match
  const fetchURL = `http://167.99.150.45:3040/dnatoprotein/relax?q=${encodeURIComponent(
    searchWord
  )}`;

  //initially I was going with this approach for validation
  //it works almost fine
  //with this approach if an invalid charactere were inserted
  //it will certainly show error but upon deleting the invalid
  //characters the error won't go away, so I ended going with
  // the regex based approach instead

  // function allowOnlyAlphabet(e) {
  //   const charCode = e.key;
  //   console.log(charCode);
  //   if (
  //     charCode === "A" ||
  //     charCode === "a" ||
  //     charCode === "C" ||
  //     charCode === "c" ||
  //     charCode === "G" ||
  //     charCode === "g" ||
  //     charCode === "T" ||
  //     charCode === "t" ||
  //     charCode === "U" ||
  //     charCode === "u"
  //   ) {
  //     setIsInputValid(true);
  //   } else {
  //     setIsInputValid(false);
  //   }
  // }

  function handleTextFieldChange(e) {
    let invalidLettersInInput = !/^[ACGTUacgtu ]+$/.test(e.target.value);
    if (e.target.value === "") {
      setIsError(false);
      setButtonDisabled(true);
      setInputHelperText("");
    } else if (invalidLettersInInput) {
      setIsError(true);
      setButtonDisabled(true);
      setInputHelperText("Only the letters A, C, G, T, U are allowed!");
    } else if (!invalidLettersInInput) {
      setIsError(false);
      setInputHelperText("");
      setButtonDisabled(false);
    }
    setSearchWord(e.target.value);
  }

  function sleepAndVanish() {
    setVanishText(true);
  }

  function handleSearchButton(e) {
    setSearchWord("");
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
      <Card
        style={{
          minWidth: 400,
          minHeight: 350,
          backgroundColor: "transparent",
        }}
      >
        <Grid item container style={{ marginLeft: 30 }}>
          <Grid
            item
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <img src={gLogo} alt="ginkgo" height="100px" />
            <Typography variant="h5" style={{ marginLeft: 10 }}>
              Ginkgo Bioworks DNA Search
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={10}
            direction="row"
            alignItems="center"
            justify="center"
            style={{ marginTop: 10 }}
          >
            <FormControl fullWidth>
              <InputLabel htmlFor="dna-textField-input">
                Enter Sequence Here
              </InputLabel>
              <Input
                error={isError}
                id="dna-textField-input"
                onChange={handleTextFieldChange}
              />
              <FormHelperText id="my-helper-text">
                {inputHelperText}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid
            item
            container
            xs={10}
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
              disabled={buttonDisabled}
              onClick={handleSearchButton}
            >
              Search
            </Button>
          </Grid>
          <Grid
            item
            container
            xs={10}
            justify="center"
            alignItems="center"
            className={vanishText ? classes.stayHidden : classes.show}
            style={{ marginTop: 10 }}
          >
            {searchResult === 0 ? (
              <Typography>
                Sorry we couldn't find a match! Try again!
              </Typography>
            ) : (
              <Typography align="justify">
                The DNA Sequence you provided was found at location{" "}
                <strong>{searchResult.match_loc}</strong> in the {" "}
                <strong>{searchResult.name}</strong>
              </Typography>
            )}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default SearchComponent;
