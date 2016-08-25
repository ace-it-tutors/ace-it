import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SessionWidgetsComponent } from '../session-widgets/session-widgets.component';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store';
import { IMessageState } from '../../store/session.reducer';
import { SessionActions } from '../../actions';
import { SocketService } from '../../services/socket.service';
import { StateGetterService } from '../../services/state-getter.service';
import { Router } from '@angular/router';
import { VideoChatComponent } from '../video-chat/videoChat.component';
import { Button } from 'primeng/primeng';

@Component({
  selector: 'session',
  styles: [`

.container{
    position: absolute;
    left: 0;
    top: 275;
}
.chat
{
    list-style: none;
    margin: 0;
    padding: 0;
}

.chat li
{
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px dotted #B3A9A9;
}

.chat li.left .chat-body
{
    margin-left: 60px;
}

.chat li.right .chat-body
{
    margin-right: 60px;
}


.chat li .chat-body p
{
    margin: 0;
    color: #777777;
}

.panel .slidedown .glyphicon, .chat .glyphicon
{
    margin-right: 5px;
}

.panel-body
{
    overflow-y: scroll;
    height: 250px;
}

::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
}

::-webkit-scrollbar
{
    width: 12px;
    background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
}



  `],
  directives: [SessionWidgetsComponent, VideoChatComponent, Button],
  providers: [StateGetterService],
  template: require('./session.template.html')
})
export class SessionComponent {
  @select(['session', 'role']) role$: Observable<string>;
  @select(['session', 'messages']) messages$: Observable<IMessageState[]>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: SessionActions,
    private socket: SocketService,
    private state: StateGetterService,
    private router: Router
  ) {}

  isTeacher() {
    return this.state.isTeacher();
  }

  leaveSession() {
    this.socket.leaveSession(
      this.state.getSessionID(),
      this.state.getAuthID(),
      this.state.getUserName()
    );

    if (this.state.isTeacher()) {
      this.actions.leaveSessionDispatch();
      this.router.navigate(['/teacher-dash']);
    } else {
      this.router.navigate(['/session-end']);
    }
  }

  onKeypress(e) {
    if (e.charCode === 13) {
      // use role as the `from` message property as placeholder
      this.socket.sendSessionMessage(
        this.state.getSessionID(),
        e.target.value,
        this.state.getUserName()
      );

      e.target.value = '';
    }
  }
  setScroll(){
    
  };
}
