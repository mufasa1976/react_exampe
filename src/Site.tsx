import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  TextField
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { ajax } from "rxjs/ajax";
import { take } from "rxjs/operators";
import { State as ReduxState } from "./redux";
import { firstAction, showDialogAction } from "./redux/actions";

interface ExportProps {
  counter?: number;
}

interface Props {
  dialog: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const initialProps: Props = {
  dialog: false,
  openDialog: () => {},
  closeDialog: () => {}
};

interface State {
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

const Site = (props: Props & ExportProps) => {
  const [state, setState] = useState<State>({
    requestInProgress: false,
    randomUser: undefined,
    value1: "Default Value 1",
    value2: "Default Value 2"
  });
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Effect called");
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
      <h1>Counter: {props.counter || 456}</h1>
      <h2>{state.value1}</h2>
      <Button color="primary" onClick={props.openDialog}>
        click me !!!
      </Button>
      <TextField label="Value 1" value={state.value1} onChange={changeValue1} />
      <TextField label="Value 2" value={state.value2} onChange={changeValue2} />
      <Avatar src={state.randomUser?.results[0]?.picture.thumbnail}>
        some Pic
      </Avatar>
      <Dialog open={props.dialog} onClose={props.closeDialog}>
        <DialogTitle>Hello Dialog</DialogTitle>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (
  { reduxState }: ReduxState,
  props: ExportProps
): Props => ({
  ...initialProps,
  dialog: reduxState.openDialog
});

const mapDispatchToProps = {
  openDialog: () => showDialogAction(true),
  closeDialog: () => showDialogAction(false)
};

export default connect(mapStateToProps, mapDispatchToProps)(Site);
