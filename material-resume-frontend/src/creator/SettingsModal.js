import React from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SettingsModal extends React.Component {
  constructor(props){
    super(props)

    this.state = {open: false}
  }

  back = (e) =>{
    e.preventDefault();
    this.props.history.goBack();
  }

  render(){
    console.log(this.props.settings);
    return(
      <Modal
        open={true}
        backgroundClickCallback={e => this.back(e)}
      >
      </Modal>
    );
  }
}


const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return({
    settings: state.components.componentSettings[id],
  })
}

const mapDispatchToProps = dispatch => ({
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingsModal));
