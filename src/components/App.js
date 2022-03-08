import React, { useEffect, useState } from 'react';
import { authService } from 'fBase';
import Loading from 'components/loading/Loading';
import AppRouter from './Router';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const getUserObj = () => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        setUserObj({
          uid: user.uid
        });

        setInit(true);
      } else {
        setUserObj(null);
        setInit(true);
      }
    });
  }

  useEffect(() => {
    if (!userObj) {
      getUserObj();
    }
  }, [init]);

  return (
    <>
      {init ? (
        <AppRouter
          userObj={userObj}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
