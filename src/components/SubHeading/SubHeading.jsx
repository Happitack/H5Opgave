import React from 'react';
import { TfiLineDotted } from 'react-icons/tfi';
import './SubHeading.css';

const SubHeading = ({ title }) => (
  <div style={{ marginBottom: '1rem' }}>
    <p className="p__cormorant">{title}</p>
    <TfiLineDotted id="subheading__icon-pencil" size="2em"/>
  </div>
);

export default SubHeading;
