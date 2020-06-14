import React from 'react';

import { routes } from '../constants';
import '../static/styles/Footer.css';


const Footer = (props) => {
    return (
      <div className='footer-wrapper'>
        <hr></hr>
        <div className='footer-content'>
          <a className='footer-link' href={routes.TUTORIAL} >
                <p>tutorial</p>
          </a>
        </div>
      </div>
    );
}


export default Footer
