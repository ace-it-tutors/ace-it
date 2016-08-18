import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { SocketService } from './socket.service';
import { TeacherActions } from '../actions';

@Injectable()
export class TeacherSocketService {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private socket: SocketService,
    private actions: TeacherActions
  ) { }

  init() {

  }

  acceptSession(session) {
    const teacherID = this.ngRedux.getState().login.userData.authid;
    const studentID = session.studentauthid;

    this.socket.acceptSession(teacherID, studentID);
  }
}
