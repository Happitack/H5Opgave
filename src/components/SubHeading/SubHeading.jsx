import React from 'react';
import { TfiPencilAlt2 } from 'react-icons/tfi';
import './SubHeading.css';

import { images } from '../../constants';

const SubHeading = ({ title }) => (
  <div style={{ marginBottom: '1rem' }}>
    <p className="p__cormorant">{title}</p>
    <TfiPencilAlt2 id="subheading__icon-pencil" size="2em"/>
  </div>
);

export default SubHeading;
