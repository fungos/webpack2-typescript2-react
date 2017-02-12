import * as React from 'react';
import { SketchPicker } from 'react-color';

const styles = require<any>('../styles.css')

export interface HelloProps { 
  bundler: string;
  compiler: string;
  framework: string;
}

export const Hello = (props: HelloProps) =>
<div className={styles.hello}>
  <h1>Hello from {props.bundler}, {props.compiler} and {props.framework}!</h1>
</div>;