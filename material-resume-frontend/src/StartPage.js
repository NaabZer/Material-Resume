import React from 'react';
import { Button } from '@rmwc/button';

import { NavLink } from 'react-router-dom';
import './StartPage.scss';

export default function StartPage() {
  return (
    <div className="start_page">
      <NavLink
        style={{color: 'black', decoration: 'none'}}
        to={{
          pathname:'/entries'
        }}
      >
        <Button
          raised
          style={{margin: '8px'}}
        >
          Entries
        </Button>
      </NavLink>

      <NavLink
        style={{color: 'black', decoration: 'none'}}
        to={{
          pathname:'/creator'
        }}
      >
        <Button
          raised
          style={{margin: '8px'}}
        >
          Creator
        </Button>
      </NavLink>
    </div>
  );
}
