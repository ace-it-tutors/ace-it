
import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { AppointmentService } from '../../services/appointment.service';
import { StudentDashboardService } from '../../services/studentDashboard.service';
import { InputText, Button } from 'primeng/primeng';



@Component({
    selector: 'teacherSubject',
    directives: [InputText, Button],
    providers: [ AppointmentService, StudentDashboardService ],
    styles: [`
    .subjectSearch {
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
    .result {
      cursor: pointer;
      border: 1px solid #33495f;
      border-radius: 5px;
      padding: 10px;
      color:  #33495f;
      width: 40%
    }
    `],
    template: `
        <h3>Subjects</h3>
        <div class="result" 
            *ngFor="let subject of teacherSubjects; let i = index" >
            <h5>{{ subject.name }}</h5>
        </div>

        <div class="subjectSearch" >
            <div class="input-field col s12">
              <input id="subject" type="text" class="validate filter-input" placeholder="What do you want to teach?" [(ngModel)]=query (keyup)=filter() size="35">
              <button class="btn btn-default" label="Add Subject" (click)="addSubject(query); clearSearch()">Add Subject</button>
            </div>
            <div class="suggestions" *ngIf="filteredList.length > 0">
                <ul *ngFor="#item of filteredList" >
                    <li >
                        <a (click)="select(item)">{{item}}</a>
                    </li>
                </ul>
            </div>
        </div>  	
        `
})

export class TeacherSubjectComponent {
    public query = '';
    public subjects = [];
    public teacherSubjects = [];
    public filteredList = [];
    private teacherid: number; 
    private fullSubjects = [];

 
constructor(
     private ngRedux: NgRedux<IAppState>,    
     private appointmentService: AppointmentService,
     private studentDashboardService: StudentDashboardService
) {}

 ngOnInit() {
     this.getSubjects()
     this.getTeacherID()
 }

 getSubjects() {
        this.appointmentService.getSubjects()
            .subscribe(
                data => 
                data.forEach(el => {
                    this.fullSubjects.push(el)
                    this.subjects.push(el.name)
                })        
            )
    }

addSubject(subject) {
    let subjectObj = this.fullSubjects.filter( (el) => { 
        return el.name === subject;
    })
   let model = {
       userID: this.teacherid,
       subjectID: subjectObj[0].id
   }
    this.studentDashboardService.addSubjectForTeacher(model)
        .subscribe(
            data => { this.getSubjectByTeacher();
                      console.log(data);
            })
}

 getSubjectByTeacher() {
      this.studentDashboardService.findSubjectsByTeacher(this.teacherid)
        .subscribe(
          data => this.teacherSubjects = data
        );
    }
    
 filter() {
    if (this.query !== ""){
        this.filteredList = this.subjects.filter(function(el){
            return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
    }else{
        this.filteredList = [];
    }
}

select(item){
    this.query = item;
    this.filteredList = [];
}

 getTeacherID(){
        let userData = this.ngRedux.getState().login['userData']
        if(userData){
          let authID = userData.authid;
          this.appointmentService.getUserID(authID)
            .subscribe( data => {
                                this.teacherid = data[0].id
                                this.getSubjectByTeacher()
                })
        } 
     }
clearSearch(){
    this.query = '';
}

}