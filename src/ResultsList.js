import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import "./App.css";
import ResultsComponent from "./ResultsComponent";
import ResultsListHeader from "./ResultsListHeader";
const useStyles = makeStyles((theme) => ({}));

function ResultsList({ k }) {
  const classes = useStyles();

  const [storedData, setStoredData] = useState(
    localStorage.getItem("proteinSearchData")
  );

  const [listData, setListData] = useState({});
  const [listLength, setListLength] = useState();
  const [resultComponentList, setResultComponentList] = useState([]);

  useEffect(() => {}, [resultComponentList]);

  useEffect(() => {
    setStoredData(window.localStorage.getItem("proteinSearchData"));
  }, [k]);

  useEffect(() => {
    if (storedData !== null) {
      const parsedObject = JSON.parse(storedData);
      const len = Object.keys(parsedObject).length;
      setListData(parsedObject);

      setListLength(len);
    }
  }, [storedData]);

  useEffect(() => {
    let result = [];
    for (let i = listLength - 1; i >= 0; i--) {
      const value = listData["" + i];
      console.log(value);
      result.push(
        <ResultsComponent
          key={i}
          status={value.success}
          time={value.time}
          location={value.match_loc}
          name={value.name}
        />
      );
    }
    setResultComponentList(result);
  }, [listData, listLength]);

  return (
    <Grid
      item
      container
      xs={12}
      direction="row"
      justify="flex-start"
      alignItems="center"
    >
      <Grid item xs={12}>
        <ResultsListHeader />
        {resultComponentList}
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}

export default ResultsList;
