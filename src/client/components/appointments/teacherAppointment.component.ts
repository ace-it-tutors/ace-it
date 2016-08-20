import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { AppointmentService  } from '../../services/appointment.service';
import { FilterDatePipe } from './pipes/appointment.date-pipe';
import { ConfirmedTeacherPipe } from './pipes/appoinment.confirmedTeacher-pipe';


@Component({
    selector: 'teacher-appointment',
    providers: [ AppointmentService ],
    pipes: [ FilterDatePipe, ConfirmedTeacherPipe ],
    template: require('./teacherAppointment.component.html'),
    styles: [`
    .appointments {
      font-family: 'Roboto', sans-serif;
      color: #33495f;
    }
    button {
      color: #33495f;
    }
    button:hover {
      color: #ff9f4f;
      background-color: white;
      cursor: pointer;
    }
     label {
      font-family: 'Roboto', sans-serif;
      color: #ff9f4f;
    }
    .apptbox {
      border: 1px solid #33495f;
      border-radius: 5px;
      padding: 10px;
      color:  #33495f;
      width: 100%
    }
    `]
})    

export class TeacherAppointmentComponent {
    private subjects = [];
    private teachers = [];
    private studentid: Number; 
    private apptModel = {};
    private apptFormOpen: boolean = false; 
    private appointments = [];
    private inputDate: string;
    private filter: boolean = false;
    private apptListOpen: boolean = false;


    constructor(
        private ngRedux: NgRedux<IAppState>,
        private appointmentService: AppointmentService) { 

        }


     ngOnInit() {
        this.getStudentID();
        this.getSubjects();
    };

    
    getSubjects() {
        this.appointmentService.getSubjects()
            .subscribe(
                data => this.subjects = data);
    }


    filterTeachers(subjectid) {
        this.appointmentService.filterTeachers(subjectid)
            .subscribe(
                data => this.teachers = data
            )
        console.log(subjectid); 
    }

    confirmAppt(sessionid){
        console.log("appt confirm", sessionid);
        this.appointmentService.confirmAppt(sessionid)
            .subscribe(
                data => { console.log(data)
                        this.getAppointments()
                }
            )
    } 

    removeAppt(sessionid){
        console.log("appt remove", sessionid);
        this.appointmentService.removeAppt(sessionid)
            .subscribe(
                data => { console.log(data)
                        this.getAppointments()
                }
            )
    } 


    // addAppointment(apptModel) {
    //     apptModel.confirmed = false;
    //     apptModel.studentid = this.studentid;
    //     apptModel.datetime = apptModel.date + ' ' + apptModel.time
    //     console.log("appt Model from add appointment", apptModel)
    //     this.appointmentService.addAppointment(apptModel)
    //         .subscribe(data => console.log("heres the data", data))
    // }


    getAppointments(){
        console.log("get appointments called with student id", this.studentid)
        this.appointmentService.getAppointmentsByTeacher(this.studentid)
            .subscribe(data => this.appointments = data);
    }
    

     getStudentID(){
        let authID = this.ngRedux.getState().login['userData'].authid;
        this.appointmentService.getUserID(authID)
            .subscribe( data => {
                                this.studentid = data[0].id
                                this.getAppointments()
                        }
            );
    }    
    

}

