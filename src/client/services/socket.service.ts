import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import {
  SessionActions,
  SessionRequestActions,
  TeacherActions
} from '../actions';
import { Router } from '@angular/router';

@Injectable()
export class SocketService {
  private socket = null;
  private listeners = {};

  private events: string[] = [
    'session-request',
    'session-start',
    'session-message',
    'session-reconnect',
    'session-requests-teacher-sync',
    'session-requests-student-sync'
  ];

  constructor(
    private sessionActions: SessionActions,
    private teacherActions: TeacherActions,
    private sessionRequestActions: SessionRequestActions,
    private router: Router
  ) { }

  connect(userID) {
    this.socket = io(undefined, { query: `userID=${userID}` });

    this.events.forEach((event) => {
      this.listeners[event] = this.getListener(event);
    });

    // allow the server to trigger an update of the student's pending requests
    this.socket.on(
      'session-requests-student-sync',
      authid => this.sessionRequestActions.syncStudentRequestsDispatch(authid)
    );

    this.socket.on(
      'session-requests-teacher-sync',
      authid => this.teacherActions.syncTeacherRequestsDispatch(authid)
    );

    this.socket.on(
      'session-reconnect',
      sessionData => this.sessionActions.setSessionDataDispatch(sessionData)
    );

    // need to move this somewhere better, preferably separating
    // it into a student handler and a teacher handler
    this.onStartedSession(({ role, data }) => {
      this.sessionActions.setRoleDispatch(role);
      this.sessionActions.setSessionDataDispatch(data);

      if (role === 'student') {
        this.sessionRequestActions.cancelAllRequestsDispatch(userID)
      }

      this.router.navigate(['/session']);
    });

    this.onSessionMessage(({ data }) => {
      this.sessionActions.addMessageDispatch(data);
    });

    this.onRequestedSession((obj) => console.log('woop', obj));
  }

  getListener(event) {
    return Observable.create((observer) => {
      this.socket.on(event, data => observer.next(data));
    });
  }

  requestSession(teacherID, student) {
    this.socket.emit('session-request', { teacherID, student });
  }

  acceptSession(teacherID, studentID) {
    this.socket.emit('session-accept', { teacherID, studentID });
  }

  leaveSession(sessionID, userID, name) {
    this.socket.emit('session-leave', { sessionID, userID, name });
  }

  sendSessionMessage(sessionID, message, from) {
    const messageObj = { message, from };
    this.socket.emit('session-message', { sessionID, message: messageObj });
  }

  onRequestedSession(callback) {
    this.listeners['session-request'].subscribe(callback);
  }

  onStartedSession(callback) {
    this.listeners['session-start'].subscribe(callback);
  }

  onSessionMessage(callback) {
    this.listeners['session-message'].subscribe(callback);
  }
}
