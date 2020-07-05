import React from 'react';

import { routes } from '../constants';
import '../static/styles/Footer.css';


const Footer = (props) => {
    return (
      <div className='footer-wrapper'>
        <hr></hr>
        <div className='footer-content'>
           <p>
             <a className='footer-link' href={routes.TUTORIAL}>
              tutorial
            </a>
          </p>
          <p>
            built by{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.linkedin.com/in/jarryngandjui/'
            >
              jarry ngandjui
            </a>
          </p>
        </div>
      </div>
    );
}


export default Footer
