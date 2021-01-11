import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Header from './components/Header/Header';
import ChatRoom from './components/ChatRoom/ChatRoom';
// import LandingPage from './components/LandingPage/LandingPage';

function App() {
  
  return (
    <>
      <ChakraProvider>
        <Header />
        <Switch>
          {/* <Route path="/" exact component={LandingPage} /> */}
          <Route path="/" exact component={Home} />
          <Route path="/app" exact component={ChatRoom} />
        </Switch>
      </ChakraProvider>
    </>
  );
}

export default App;
