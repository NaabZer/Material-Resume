import React from 'react';

import { CircularProgress } from '@rmwc/circular-progress';
import { Icon } from '@rmwc/icon';


export default class LoadingIcon extends React.Component {
  render(){
    const {size, loadingTheme, iconTheme, loading, icon, ...props} = this.props
    if(loading){
      return(
        <CircularProgress
          {...props}
          size={size}
          theme={loadingTheme || 'on-primary'}
        />
      )
    }
    return(
      <Icon 
        {...props}
        icon={{icon: icon, size: size}}
        theme={iconTheme || 'on-primary'}
      />
    )
  }
}
