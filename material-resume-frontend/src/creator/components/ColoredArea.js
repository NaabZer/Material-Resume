import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './CardComponent.scss';
import hoistNonReactStatic from 'hoist-non-react-statics';

import DragAndDropGrid from '../DragAndDropGrid';


class ColoredArea extends React.Component {
  static defaultSettings = {
    rows: 12,
    cols: 2,
    gap: '4px',
    background: 'brown'
  }

  static propTypes = {
    settings: PropTypes.object.isRequired,
    componentid: PropTypes.number
  }

  static isGrid = true;

  static displayName = "Colored Area"
  
  render(){
    const {settings, componentid, forwardedRef, ondropcallback, props,} = this.props;
    return (
      <div
        style={{background: settings.background, width:"100%", height:"100%"}}
      >
        <DragAndDropGrid 
          {...props}
          ref={forwardedRef}
          componentdropcallback={ondropcallback}
          componentdragcallback={() => {}}
          isgrid={true}
          rows={settings.rows}
          columns={settings.cols}
          gap={settings.gap}
          componentid={componentid}
          style={{
            width: 'calc(100% - 2*'+settings.gap+")",
            height: 'calc(100% - 2*'+settings.gap+")",
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return({ 
    data: state.entries
  });
}

const forwardedColoredArea = React.forwardRef((props, ref) =>{
  return <ColoredArea {...props} forwardedRef={ref}/>;
});
hoistNonReactStatic(forwardedColoredArea, ColoredArea);
export default forwardedColoredArea;