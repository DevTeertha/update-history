import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InformationContainer from './components/InformationContainer';
import { infoDataI, infoI } from './components/interfaceAndTypes';
import {
  ADD_INFO_API,
  DELETE_INFO_API,
  EDIT_INFO_API,
  GET_INFO_API,
} from './components/api/apiUrl';
import { createContext, useEffect, useState } from 'react';

export const myContext = createContext<any>({});

function App() {
  const [info, setInfo] = useState<infoI>({
    status: false,
    message: 'no data',
    data: [],
  });
  const [loading, setLoading] = useState<boolean>(false);

  const getInfo = async () => {
    setLoading(true);
    const result = await fetch(GET_INFO_API);
    const data = await result.json();
    setLoading(false);
    setInfo(data);
  };
  const addInfo = async (data: infoDataI) => {
    const res = await fetch(ADD_INFO_API, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  };
  const editInfo = async (data: infoDataI) => {
    const res = await fetch(EDIT_INFO_API, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  };
  const deleteInfo = async (id: string) => {
    const res = await fetch(DELETE_INFO_API, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    const result = await res.json();
    return result;
  };
  const allStates = {
    infoState: [info, setInfo],
    loadingState: [loading, setLoading],
    getInfo: getInfo,
    addInfo: addInfo,
    editInfo: editInfo,
    deleteInfo: deleteInfo,
  };
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <myContext.Provider value={allStates}>
      <InformationContainer />
    </myContext.Provider>
  );
}

export default App;
