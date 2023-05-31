import { useState, useEffect } from "react";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

interface State {
  [key: string]: any;
}

let state: State = {};
const dependencies = new Set<() => void>();
let devTools: any;

function setState(key: string, value: any) {
  state = {
    ...state,
    [key]: value,
  };
  dependencies.forEach((dependency) => dependency());

  if (devTools) {
    devTools.send(key, state);
  }
}

export function useAtom(
  key: string,
  initialValue: any = undefined
): [any, (value: any | ((prevState: any) => any)) => void] {
  if (!(key in state) && initialValue !== undefined) {
    state[key] = initialValue;
  }

  const [stateValue, setStateValue] = useState(state[key]);

  useEffect(() => {
    const dependency = () => {
      setStateValue(state[key]);
    };

    dependencies.add(dependency);

    return () => {
      dependencies.delete(dependency);
    };
  }, [key]);

  const setInternalState = (value: any | ((prevState: any) => any)) => {
    if (typeof value === "function") {
      setState(key, value(state[key]));
    } else {
      setState(key, value);
    }
  };

  return [stateValue, setInternalState];
}

export function useStore(
  initialState: { [key: string]: any },
  enableDevTools: boolean
) {
  Object.entries(initialState).forEach(([key, value]) => {
    if (!(key in state)) {
      state[key] = value;
    }
  });

  if (enableDevTools) {
    devTools = window.__REDUX_DEVTOOLS_EXTENSION__;
    if (devTools) {
      devTools.connect();
      devTools.send("@INIT", state);
    }
  }
}
