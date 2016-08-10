import { Injectable } from '@angular/core';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import { Store } from 'redux';
import { IAppState, rootReducer, enhancers } from '../store';
const createLogger = require('redux-logger');

@Injectable()
export class ConfigureStoreService {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension
  ) {}

  configure(ngRedux: NgRedux<IAppState>): void {
    ngRedux.configureStore(
      rootReducer,
      {},
      [ createLogger() ],
      [
        ...enhancers,
        this.devTool.isEnabled() ? this.devTool.enhancer() : f => f
      ]
    );
  }
  
}
