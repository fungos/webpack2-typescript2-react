import * as React from "react";
import * as ReactDOM from "react-dom";
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss'
import { Hello } from "./components/Hello";

const styles = require<any>('styles.css')

export interface AppProperties { 
  background?: string; 
}

export interface AppStates {
  open: boolean;
  background: string;
}

export class App extends React.Component<AppProperties, AppStates> {
  constructor(props: AppProperties) {
    super(props);
    this.state = { 
      open: false,
      background: this.props.background ? this.props.background : "#f00" 
    };
  }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  };

  handleClose = () => {
    this.setState({ open: false })
  };

  handleChange = (color) => {
    this.setState({ background: color.hex });
  };

  render() {
    const css = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `${ this.state.background }`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
        button: {
          left: '50%',
          position: 'absolute',
        }
      },
    });

    const picker = (
          <div style={ styles.popover }>
            <div style={ styles.cover } onClick={ this.handleClose }/>
            <SketchPicker color={ this.state.background } onChange={ this.handleChange } />
          </div>);

    // Here we demonstrate how to change styles in four different ways:
    // 1. acessing dom directly to set body background: document.body.style.backgroundColor = this.state.background 
    // 2. using a definition on styles.css and acessing as a component: { styles.bg }
    // 3. inline style by using a CSSProperties object: {{ background: this.state.background }}
    // 4. using reactCSS: css.color
    document.body.style.backgroundColor = this.state.background;
    return (
      <div className={ styles.bg } style={{ background: this.state.background }}>
        <Hello bundler="Webpack 2" compiler="TypeScript 2" framework="React" />
        <div style={ css.button }>
          <div style={ css.swatch } onClick={ this.handleClick }>
            <div style={ css.color } />
          </div>
          { this.state.open ? picker : null }
        </div>
      </div>
    );
  }
}
