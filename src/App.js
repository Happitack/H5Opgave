import React from 'react';

import { AboutUs, Chef, Footer, Gallery, Header, Intro, Laurels } from './container';
import { Navbar } from './components';
import './App.css';

const App = () => (
  <div>
    <Navbar />
    <Header />
    <AboutUs />
    <Chef />
    <Intro />
    <Laurels />
    <Gallery />
    <Footer />
  </div>
);

export default App;
