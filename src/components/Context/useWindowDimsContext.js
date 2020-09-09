import React, { createContext, useContext, useState, useEffect } from 'react';

export const Context = createContext({});

export const Provider = ({ children }) => {

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize)
    return () => { window.removeEventListener('resize', handleResize) }
  }, []);

  const context = {
    dimensions,
    setDimensions,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

export const useWindowDimsContext = () => useContext(Context);
