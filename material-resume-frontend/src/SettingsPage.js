import React from 'react';
import { connect } from 'react-redux';

import { Card } from "@rmwc/card";
import { Button } from '@rmwc/button';
import { Typography } from '@rmwc/typography';
import { Select } from '@rmwc/select';
import { Checkbox } from '@rmwc/checkbox';

import { THEMES, getThemeName } from './utility/Themes';

import { userChangeValue, resetUserChanges, saveUser } from './actions/user';

class SettingsPage extends React.Component {
  componentWillUnmount(){
    this.props.resetUserChanges()
  }

  render(){

    if(!this.props.user.user){
      return(
      <Card
        style={{width: '60vw', margin: '8px auto', minHeight: '20vh'}}
      >
        <Typography
          use="headline2"
          style={{margin: '8px 0px', alignSelf: 'center'}}
        >
          Settings
        </Typography>
      </Card>
      );
    }

    let user = this.props.user.user;
    const themes = THEMES.map(theme => (
      {label: getThemeName(theme), value: theme}
    ), [])
    return(
      <Card
        style={{width: '60vw', margin: '8px auto', minHeight: '20vh'}}
      >
        <Typography
          use="headline2"
          style={{margin: '8px 0px', alignSelf: 'center'}}
        >
          Settings
        </Typography>
        <div
          style={{width: '60%', margin: '12px', marginTop: '80px', alignSelf: 'center'}}
        >
          <Select
            autoFocus
            label='Theme'
            name='theme'
            value={user.setting_page_theme}
            onChange={e => this.props.userChangeValue('setting_page_theme', e.currentTarget.value)}
            options={themes}
          />
          <Checkbox
            label="Override website theme with resume theme"
            checked={user.setting_override_theme}
            onChange={e => this.props.userChangeValue('setting_override_theme', !user.setting_override_theme)}
          />
          <div
            style={{paddingTop: '16px'}}
          />
          <Button
            style={{width: '100%'}}
            raised
            onClick={() => this.props.saveUser(user)}
          >
            Save
          </Button>
        </div>

      </Card>
    );
  };
}

const mapStateToProps = (state) => {
  return({
    user: state.user
  })
}

const mapDispatchToProps = dispatch => ({
  userChangeValue: (key, value) => dispatch(userChangeValue(key,value)),
  resetUserChanges: (key, value) => dispatch(resetUserChanges(key,value)),
  saveUser: (user) => dispatch(saveUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
