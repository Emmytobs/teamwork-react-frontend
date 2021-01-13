import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Header from './components/Header/Header';
import ChatRoom from './components/ChatRoom/ChatRoom';
import ChatRoomProtected from './components/ProtectedRoutes/ChatRoom.protected';

function App() {
  
  return (
    <>
      <ChakraProvider>
        <Header />
        <Switch>
          {/* <Route path="/" exact component={LandingPage} /> */}
          <Route path="/" exact component={Home} />
          <ChatRoomProtected path='/app' exact component={ChatRoom} />
        </Switch>
      </ChakraProvider>
    </>
  );
}

export default App;
