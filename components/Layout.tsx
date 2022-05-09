import React from 'react';
import {Header} from './';

const Layout:React.FC = ({children}) => {
  return (
    <React.Fragment>
        <Header />
        {children}
    </React.Fragment>
  )
}

export default Layout;