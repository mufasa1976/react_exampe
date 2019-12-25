import { Button, Dialog, DialogTitle, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ajax } from "rxjs/ajax";
import { take } from "rxjs/operators";
import { firstAction } from "./redux/actions";

interface Props {
  query: string;
  counter?: number;
}

interface State {
  openDialog: boolean;
  requestInProgress: boolean;
  randomUser: RandomUser | undefined;
  value1: string;
  value2: string;
}

interface RandomUser {
  results: {
    gender: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
    location: {
      street: {
        number: number;
        name: string;
      };
      city: string;
      state: string;
      country: string;
      postcode: number;
      coordinates: {
        latitude: string;
        longitutde: string;
      };
      timezone: {
        offset: string;
        description: string;
      };
    };
    email: string;
    dob: {
      date: Date;
      age: number;
    };
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
  }[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

const Site = ({ counter = 123, ...props }: Props) => {
  console.log(props);
  const [state, setState] = useState<State>({
    openDialog: false,
    requestInProgress: false,
    randomUser: undefined,
    value1: "Default Value 1",
    value2: "Default Value 2"
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (!state.randomUser && !state.requestInProgress) {
      console.log("Getting randomuser data");
      dispatch(firstAction(true));
      setState(state => ({ ...state, requestInProgress: true }));
      ajax
        .getJSON<RandomUser>("https://randomuser.me/api/")
        .pipe(take(1))
        .subscribe(randomUser => {
          console.log(randomUser);
          console.log(randomUser.results[0]?.name.last);
          console.log(randomUser.results[0]?.dob.date);
          setState(state => ({
            ...state,
            requestInProgress: false,
            randomUser: randomUser
          }));
        });
    }
  }, [state.randomUser, state.requestInProgress, dispatch]);

  const openDialog = () => {
    setState(state => ({ ...state, openDialog: true }));
  };

  const closeDialog = () => {
    setState(state => ({ ...state, openDialog: false }));
  };

  const changeValue1 = (event: any) => {
    const value = event.target.value;
    setState(state => ({ ...state, value1: value }));
  };

  const changeValue2 = (event: any) => {
    const value = event.target.value;
    setState(state => ({ ...state, value2: value }));
  };

  return (
    <div>
      <h1>Hello World, {counter}</h1>
      <h2>{state.value1}</h2>
      <Button color="primary" onClick={openDialog}>
        click me !!!
      </Button>
      <TextField label="Value 1" value={state.value1} onChange={changeValue1} />
      <TextField label="Value 2" value={state.value2} onChange={changeValue2} />
      <img src={state.randomUser?.results[0]?.picture.large} alt="some Pic" />
      <Dialog open={state.openDialog} onClose={closeDialog}>
        <DialogTitle>Hello Dialog</DialogTitle>
      </Dialog>
    </div>
  );
};

export default Site;
