import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  Box: {
    width: 400,
    backgroundColor: "gold"
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
    color: "blue"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150
  },
  SelectControl: {
    display: "flex",
    justifyContent: "center"
  },
  faleMais_inactive: {
    marginTop: 20,
    backgroundColor: "white"
  },
  faleMais_active: {
    marginTop: 20,
    backgroundColor: "gold"
  },
  input: {
    width: 80
  }
}));

export default function SelectBox() {
  const classes = useStyles();
  const [DDD1, setDDD1] = React.useState("");
  const [DDD2Opt, setDDD2Opt] = React.useState([]);
  const [DDD2, setDDD2] = React.useState("");
  const [time, setTime] = React.useState("");
  const [plan, setPlan] = React.useState("");
  const [errorPlan, setErrorPlan] = React.useState(false);
  const [errorDDD1, setErrorDDD1] = React.useState(false);
  const [errorDDD2, setErrorDDD2] = React.useState(false);
  const [errorTime, setErrorTime] = React.useState(false);
  const [price, setPrice] = React.useState(" ");
  const [faleMais, setFaleMais] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [openPlan, setOpenPlan] = React.useState(false);

  const calculate = () => {
    let full_values = true;
    if (DDD1 == "") {
      setErrorDDD1(true);
      full_values = false;
    }
    if (DDD2 == "") {
      setErrorDDD2(true);
      full_values = false;
    }
    if (time == "") {
      setErrorTime(true);
      full_values = false;
    }
    if (faleMais && plan == "") {
      setErrorPlan(true);
      full_values = false;
    }
    if (full_values) {
      axios
        .post("/calculate", { DDD1, DDD2, time, faleMais, plan })
        .then(resp => setPrice(resp.data.value));
    } else {
      setPrice("");
    }
  };

  const adjustDDD2 = () => {
    if (DDD1 == "") {
      setDDD2("");
      setDDD2Opt([""]);
    } else if (DDD1 == "011") {
      setDDD2("");
      setDDD2Opt(["", "016", "017", "018"]);
    } else if (DDD1 == "016" || DDD1 == "017" || DDD1 == "018") {
      setDDD2("");
      setDDD2Opt(["", "011"]);
    }
  };

  return (
    <div className={classes.Box}>
      <div>
        <div className={classes.SelectControl}>
          <h3>DDD</h3>
        </div>
        <div className={classes.SelectControl}>
          <div>
            <FormControl className={classes.formControl} error={errorDDD1}>
              <InputLabel id="ddd_from">Origem</InputLabel>
              <Select
                open={open1}
                onClose={() => {
                  setOpen1(false);
                }}
                onOpen={() => setOpen1(true)}
                value={DDD1}
                onBlur={adjustDDD2}
                onChange={e => {
                  setDDD1(e.target.value);
                  if (e.target.value != "") setErrorDDD1(false);
                }}
              >
                <MenuItem value="">
                  <em>DDD</em>
                </MenuItem>
                <MenuItem value={"011"}>011</MenuItem>
                <MenuItem value={"016"}>016</MenuItem>
                <MenuItem value={"017"}>017</MenuItem>
                <MenuItem value={"018"}>018</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl} error={errorDDD2}>
              <InputLabel id="ddd_to">Destino</InputLabel>
              <Select
                // labelId="demo-controlled-open-select-label"
                // id="demo-controlled-open-select"
                open={open2}
                onClose={() => setOpen2(false)}
                onOpen={() => setOpen2(true)}
                value={DDD2}
                onChange={e => {
                  setDDD2(e.target.value);
                  if (e.target.value != "") setErrorDDD2(false);
                }}
              >
                <MenuItem value="">
                  <em>{DDD1 != "" ? "DDD" : "Selecione a origem"}</em>
                </MenuItem>
                {DDD2Opt.map(val => {
                  return (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div>
        <div className={classes.SelectControl}>
          <h3>Minutos</h3>
        </div>
        <div className={classes.SelectControl}>
          <Input
            className={classes.input}
            value={time}
            margin="dense"
            type="number"
            onChange={e => {
              if (Number(e.target.value) || e.target.value == "")
                setTime(e.target.value);
              if (e.target.value != "") setErrorTime(false);
            }}
            onBlur={() => {
              if (Number(time) % 1 != 0) setTime(Math.ceil(time));
            }}
            inputProps={{
              step: 1,
              min: 0,
              type: "number",
              "aria-labelledby": "input-slider"
            }}
            error={errorTime}
          />
        </div>
      </div>
      <div
        className={
          faleMais ? classes.faleMais_active : classes.faleMais_inactive
        }
      >
        <div className={classes.SelectControl}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={faleMais}
                  onChange={() => {
                    setFaleMais(!faleMais);
                    setPlan("");
                  }}
                />
              }
              label="Fale Mais"
            />
          </FormGroup>
        </div>
        <div className={classes.SelectControl}>
          <FormControl className={classes.formControl}>
            <InputLabel id="ddd_from">Plano</InputLabel>
            <Select
              open={openPlan}
              onClose={() => setOpenPlan(false)}
              onOpen={() => setOpenPlan(true)}
              value={plan}
              onChange={e => {
                setPlan(e.target.value);
                if (e.target.value != "") setErrorPlan(false);
              }}
              disabled={!faleMais}
              disableUnderline={!faleMais}
              error={errorPlan}
            >
              <MenuItem value="">
                <em>Plano</em>
              </MenuItem>
              <MenuItem value={30}>30 min</MenuItem>
              <MenuItem value={60}>60 min</MenuItem>
              <MenuItem value={120}>120 min</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={classes.SelectControl}>
        <Button className={classes.button} onClick={calculate}>
          Calcular
        </Button>
      </div>
      <div className={classes.SelectControl}>
        <h1>${price}</h1>
      </div>
    </div>
  );
}
