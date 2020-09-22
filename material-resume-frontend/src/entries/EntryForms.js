import React from 'react';

import { TextField } from '@rmwc/textfield';
import '@rmwc/textfield/styles';

export function getEntryFormFromType(type){
  switch(type){
    case 'work':
      return WorkForm;
    default:
      return null;
  }
}

class WorkForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {...this.props.entry};
  }

  onChange = (type, e) =>{
    this.setState({[this.props.lang]:{...this.state[this.props.lang], [type]: e.currentTarget.value}});
  }

  getValues = () =>{
    return(this.state);
  }

  focusAll = (event) => event.target.select();

  render(){
    return(
      <div
        style={{width: '100%'}}
      >
        <TextField
          autoFocus
          style={{width: '100%'}}
          label='Title'
          name='title'
          value={this.state[this.props.lang].title}
          onChange={e => this.onChange('title', e)}
          onFocus={this.focusAll}
        >
        </TextField>
        <TextField
          style={{width: '100%'}}
          label='Location'
          name='location'
          value={this.state[this.props.lang].location}
          onChange={e => this.onChange('location', e)}
          onFocus={this.focusAll}
        >
        </TextField>
        <TextField
          style={{width: '100%'}}
          type='date'
          label='Start Date'
          name='dateStart'
          value={this.state[this.props.lang].dateStart}
          onChange={e => this.onChange('dateStart', e)}
          onFocus={this.focusAll}
        >
        </TextField>
        <TextField
          style={{width: '100%'}}
          type='date'
          label='End Date'
          name='dateEnd'
          value={this.state[this.props.lang].dateEnd}
          onChange={e => this.onChange('dateEnd', e)}
          onFocus={this.focusAll}
        >
        </TextField>
        <TextField
          textarea
          style={{width: '100%', marginTop:'16px'}}
          label='Description'
          name='description'
          value={this.state[this.props.lang].description}
          onChange={e => this.onChange('description', e)}
          onFocus={this.focusAll}
        >
        </TextField>
      </div>
    );
  }
}
