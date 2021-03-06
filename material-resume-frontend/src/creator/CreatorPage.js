import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';


import axios from 'axios';

import { Button } from '@rmwc/button';
import { CircularProgress } from '@rmwc/circular-progress';
import { ThemeProvider } from '@rmwc/theme';

import { THEME_BASELINE, getThemeOptions } from '../utility/Themes';


import { 
  addComponent,
  moveComponent,
  resizeComponent,
  addPage,
  loadComponents,
} from '../actions/components';
import { loadAllEntries } from '../actions/entries';
import SettingsModal from './SettingsModal';
import FloatingResumeSettings from './FloatingResumeSettings';
import ResumeSettingsModal from './ResumeSettingsModal';

import ComponentSelector from './ComponentSelector';
import Page from './components/Page';


class CreatorPage extends React.Component {
  constructor(props){
    super(props);

    this.pages = [];
    this.state = {testOpen: true, pdfDownloading: false, svgUrl: null}
  }

  downloadPdf = (e) => {
    this.setState({pdfDownloading: true})
    axios.post('http://localhost:81/pdf', {
      components: this.props.components,
      entries: this.props.entries,
      languages: this.props.languages
    }, {
      responseType: 'arraybuffer',
      headers: {
        'Accept': 'application/pdf'
      }})
      .then(response => {
        const blob = new Blob([response.data], {type: 'application/pdf'})
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = `your-file-name.pdf`
        link.click()
        this.setState({pdfDownloading: false})
        console.log('after call')
      })
      .catch( error => {
        this.setState({pdfDownloading: false})
        console.log('error call')
      })
  }

  onDrop = (comp, e, data, type) => {
    const x = data.x - this.props.drag.grab_x;
    const y = data.y - this.props.drag.grab_y;
    var childE = null
    var row = -1;
    var col = -1;
    // This function assumes that you can not have overlapping grids.
    //const child = this.grid;
    var excludedIds = [];
    if(this.props.drag.componentId){
      excludedIds = [this.props.drag.componentId]
    }
    this.pages.forEach(childRef => {
      const child = childRef.current;
      if(child.props.isgrid){
        const [elem, childCol, childRow] = child.getDeepestGridElemAndPos(x, y, excludedIds)
        if(elem !== null && childRow >= 0 && childRow < elem.props.rows &&
          childCol >= 0 && childCol < elem.props.columns){
          childE = elem;
          col = childCol;
          row = childRow;
          return
        }
      }
    });
    this.setState({x: 0, y: 0});
    if(childE !== null){
      if(type === 0){
        const [width, height] = childE.getClosestRowColSize(200, 200);
        this.props.addcomponent(this.props.drag.componentType, childE.props.componentid, col, row, width, height);
      } else if (type ===1){
        const [width, height] = childE.getClosestRowColSize(this.props.drag.width, this.props.drag.height);
        this.props.movecomponent(data.id, childE.props.componentid, col, row);
        this.props.resizeComponent(data.id, width, height);
      }
    } 
  }

  render(){
    //Start load of entries
    if(!this.props.entries.isFetching && (!this.props.entries.text.fetched ||
       !this.props.entries.experience.fetched) && !this.props.entries.error){
      this.props.loadAllEntries();
    }

    //Start load of components
    if(!this.props.components.loading && this.props.components.fetched === 0 && 
    !this.props.components.error){
      this.props.loadComponents(this.props.match.params.id);
    }

    let loaded = true;
    const entries = this.props.entries;
    loaded = loaded && !entries.isFetching && entries.text.fetched && entries.experience.fetched;
    loaded = loaded && this.props.components.fetched !== 0;
    const error = this.props.components.error || entries.error;
    let page_content;
    let theme = THEME_BASELINE;
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
          />
        );
      });
      page_content = 
        <div
          style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}
        >
          {pages}
          <Button
            raised
            onClick={()=> this.props.addPage()}
            style={{margin: '8px'}}
          >
            Add page
          </Button>
        </div>
    }else if(error){
      page_content =
        <div
          style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}
        >
          ERROR
        </div>
    } else {
      page_content =
        <div
          style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}
        >
          <CircularProgress size={52}/>
        </div>
    }

    return (
      <div>
        <ThemeProvider
          options={getThemeOptions(theme)}
        >
          <Route exact path='/resumes/creator/component/:id/settings'> 
            <SettingsModal/>
          </Route>
          <Route exact path='/resumes/creator/:id/settings'> 
            <ResumeSettingsModal/>
          </Route>
          <ComponentSelector
            componentdropcallback={(c, e, d) => this.onDrop(c, e, d, 0)}
            style={{position: 'sticky', top: '0px'}}
          />
          <FloatingResumeSettings
            pdfDownloading={this.state.pdfDownloading}
            savePdfCallback={this.downloadPdf}
          />

          <div
          >
            {page_content}
          </div>
        </ThemeProvider>
      </div>
    )
  }
}
const mapStateToProps = state => {
  const languages = (state.user.user && state.user.user.languages) || [{language: 'en'}];
  return ({
    pages: state.components.pages,
    drag: state.dragAndDrop,
    entries: state.entries,
    components: state.components,
    languages: languages,
  });
};

const mapDispatchToProps = dispatch => ({
  addcomponent: (componentType, containerId, row, col, width, height) => 
    dispatch(addComponent(componentType, containerId, row, col, width, height)),
  movecomponent: (id, containerId, row, col) => 
    dispatch(moveComponent(id, containerId, row, col)),
  resizeComponent: (id, width, height) => dispatch(resizeComponent(id, width, height)),
  addPage: () => dispatch(addPage()),
  loadAllEntries: () => dispatch(loadAllEntries()),
  loadComponents: (id) => dispatch(loadComponents(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatorPage));
