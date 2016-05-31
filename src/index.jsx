import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.styl';
import '../node_modules/material-design-lite/material.min.js';
import Page from './Page';

export class App extends React.Component {

  constructor(props) {
    super(props);

    // state
    this.state = {
      data: null
    };

    // this binding
    this.updateData = this.updateData.bind(this);

    // for drag event handling
    this.previousEvent = null;
  }

  componentDidMount() {
    let body = document.getElementsByTagName('body')[0];
    body.addEventListener('drop', (e) => {
      if (e.target.id !== 'json-text') {
        e.preventDefault();
        e.stopPropagation();
      }
      this.previousEvent = 'drop';
      body.classList.remove('dragging');
    });
    body.addEventListener('dragover', (e) => {
      if (this.previousEvent === 'dragenter') {
        body.classList.add('dragging');
      }
      this.previousEvent = 'dragover';
      e.preventDefault();
      return false;
    });
    body.addEventListener('dragenter', (e) => {
      this.previousEvent = 'dragenter';
    });
    body.addEventListener('dragleave', (e) => {
      if (this.previousEvent === 'dragover') {
        body.classList.remove('dragging');
      }
      this.previousEvent = 'dragleave';
    });
  }

  updateData(newData) {
    this.setState({data: newData});
  }

	render() {
		return (
			<Page data={this.state.data} updateData={this.updateData} />
		);
	}
}

ReactDOM.render(<App/>, document.querySelector("#myApp"));