import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { TeacherActions } from '../../actions';
import { TeacherSocketService } from '../../services/teacher-socket.service';

@Component({
  selector: 'teacher-dashboard',
  providers: [ TeacherActions ],
  template: require('./teacher-dashboard.template.html')
})
export class TeacherDashboardComponent {
  @select([
    'teacher',
    'available'
  ]) available$: Observable<boolean>;

  @select([
    'teacher',
    'sessions'
  ]) sessions$: Observable<any[]>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: TeacherActions,
    private teacherSocket: TeacherSocketService
  ) { }

  acceptSession(session) {
    this.teacherSocket.acceptSession(session);
  }
}
