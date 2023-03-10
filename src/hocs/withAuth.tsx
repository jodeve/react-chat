import React, { FC, useEffect } from 'react';
import useFetch from '../lib/useFetch';
import AppContext from '../contexts/AppContext';
import useCable from 'hooks/useCable';


const withAuth = (Component: FC) => {
  return () => {

    const [currentUser, setCurrentUser] = React.useState(null);
    const [isFetching, setIsFetching] = React.useState(true);

    const onSuccess = (body: any) => {
      setCurrentUser(body.data);
      setIsFetching(false);
    }

    const handleError = () => setIsFetching(false);

    const {
      onFetch,
    } = useFetch("/validate_token", onSuccess, handleError);

    const validateToken = async () => {
      await onFetch();
    }

    React.useEffect(() => {
      validateToken()
    }, []);

    const signOut = () => {
      localStorage.removeItem("token");
      setCurrentUser(null);
    }

    const { cable } = useCable(currentUser);

    const appContext = {
      currentUser,
      isFetching,
      signOut,
      setCurrentUser,
      cable,
    }

    if (isFetching) return null;

    return (
      <AppContext.Provider
        value={appContext}
      >
        <Component />
      </AppContext.Provider>
    );
  }
}

export default withAuth;
