import React from 'react';

import { AboutUs, Film2, Footer, Paranoia, Trailer} from './container';
import { Navbar } from './components';
import './App.css';

const App = () => (
  <div>
    <Navbar />
    <AboutUs />
    <Paranoia />
    <Trailer />
    <Film2 />
    <Footer />
  </div>
);

export default App;
