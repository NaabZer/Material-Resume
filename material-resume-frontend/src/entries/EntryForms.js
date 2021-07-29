import React from 'react';

import { TextField } from '@rmwc/textfield';
import '@rmwc/textfield/styles';

export function getEntryFormFromType(type){
  switch(type){
    case 'experience':
      return WorkForm;
    case 'text':
      return TextForm;
    default:
      return null;
  }
}

class TextForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {...this.props.entry};
  }

  onChange = (e) =>{
    this.setState({
      'entries':
      {
        ...this.state.entries,
        [this.props.lang]:{...this.state.entries[this.props.lang],
                           'text': e.currentTarget.value}
      }
    });
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
          label='Text'
          name='text'
          value={this.state.entries[this.props.lang].text}
          onChange={e => this.onChange(e)}
          onFocus={this.focusAll}
        >
        </TextField>
      </div>
    );
  }
}

class WorkForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {...this.props.entry};
  }

  onChange = (type, e) =>{
    if(type === "start" || type === "end"){
      this.setState({[type]:  e.currentTarget.value});
    } else{
      this.setState({
        'entries':
        {
          ...this.state.entries,
          [this.props.lang]:{...this.state.entries[this.props.lang], [type]: e.currentTarget.value}
        }
      });
    }
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
          value={this.state.entries[this.props.lang].title}
          onChange={e => this.onChange('title', e)}
          onFocus={this.focusAll}
        >
        </TextField>
        <TextField
          style={{width: '100%'}}
          label='Location'
          name='location'
          value={this.state.entries[this.props.lang].location}
          onChange={e => this.onChange('location', e)}
          onFocus={this.focusAll}
        >
        </TextField>
        <TextField
          style={{width: '100%'}}
          type='date'
          label='Start Date'
          name='start'
          value={this.state.start}
          onChange={e => this.onChange('start', e)}
          onFocus={this.focusAll}
        >
        </TextField>
        <TextField
          style={{width: '100%'}}
          type='date'
          label='End Date'
          name='end'
          value={this.state.end}
          onChange={e => this.onChange('end', e)}
          onFocus={this.focusAll}
        >
        </TextField>
        <TextField
          textarea
          style={{width: '100%', marginTop:'16px'}}
          label='Description'
          name='description'
          value={this.state.entries[this.props.lang].description}
          onChange={e => this.onChange('description', e)}
          onFocus={this.focusAll}
        >
        </TextField>
      </div>
    );
  }
}
