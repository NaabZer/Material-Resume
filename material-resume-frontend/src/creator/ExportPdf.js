import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ThemeProvider } from '@rmwc/theme';

import { THEME_BASELINE, getThemeOptions } from '../utility/Themes';


import { setComponents } from '../actions/components';
import { setEntries } from '../actions/entries';
import { setUserLanguages } from '../actions/user';

import Page from './components/Page';

class CreatorPage extends React.Component {
  constructor(props){
    super(props);

    this.pages = [];
  }

  componentDidMount() {
    window.setPdfData = (components, entries, languages) => {
      this.props.setEntries(entries)
      this.props.setComponents(components)
      this.props.setUserLanguages(languages)
      return "data set"
    }
  }


  render(){
    let loaded = true;
    let theme = THEME_BASELINE;
    let page_content;
    const entries = this.props.entries;
    loaded = loaded && !entries.isFetching && entries.text.fetched && entries.experience.fetched;
    loaded = loaded && this.props.components.fetched !== 0;

    if(loaded){
      theme = this.props.components.resumeSettings.theme;
      this.pages = [];
      const pages = this.props.pages.map( (id, i) => {
        this.pages.push(React.createRef());
        return(
          <Page 
            key={id}
            componentdropcallback={(c, e, d) => this.onDrop(c, e, d, 1)}
            pageid={i}
            componentid={id}
            ref={this.pages[i]} 
            onlyPage
          />
        );
      });
      page_content = 
        <div
          style={{width: '210mm'}}
        >
          {pages}
        </div>
    }
    else{
      return <div/>
    }

    return (
      <div>
        <ThemeProvider
          options={getThemeOptions(theme)}
        >
          {page_content}
        </ThemeProvider>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  pages: state.components.pages,
  drag: state.dragAndDrop,
  entries: state.entries,
  components: state.components
});

const mapDispatchToProps = dispatch => ({
  setComponents: (components) => dispatch(setComponents(components)),
  setEntries: (entries) => dispatch(setEntries(entries)),
  setUserLanguages: (languages) => dispatch(setUserLanguages(languages)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatorPage));
