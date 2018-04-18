import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { ProjectModel, UserModel } from '../../utilities/model';

@Component({
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent implements OnInit  {
    projectsList: ProjectModel[] = [
        { projectName:'proj1', totalTasks: 1, startDate: '02/03/2018', endDate: '03/03/2018', completed: 'completed', priority: 24, manager: 345},
        { projectName:'proj2', totalTasks: 1, startDate: '02/03/2018', endDate: '03/03/2018', completed: 'completed', priority: 12, manager: 234},
    ];
    usersList: UserModel[] = [
        { userId: 1, firstName:'vijay', lastName: 'varma', employeeId: 345, projectId: 1, taskId: 1},
        { userId: 2, firstName:'john', lastName: 'doe', employeeId: 234, projectId: 2, taskId: 2},
    ];
    myOptions: INgxMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
    };
    public addOrUpdateBtn: string = 'Add';
    mgrName: string = null;

    private addProjectForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { 
        console.log(this.usersList);   
    }

    ngOnInit() {
        this.addProjectForm = this.formBuilder.group({
            projectNameControl: [null, Validators.required],
            checkDatesControl: [null],
            startDateControl: [null],
            endDateControl: [null],
            priorityControl: [null, Validators.required],
            selectedManagerControl: [null, Validators.required],
            priorityDisplayControl: [null]
        });  
        console.log(this.addProjectForm);  
    }

    addProjectSubmit() {
        console.log(this.addProjectForm);
        
    }

    addProjectReset() {
        this.addProjectForm.reset();
        this.addOrUpdateBtn = 'Add';
    }

    updateProject(projName) {
        let selectedProject = null;
        let dateCheckBox = true;
        this.projectsList.forEach(proj => {
            if (proj.projectName == projName) {
                selectedProject = proj;
            }
        });
        this.addProjectForm.reset();
        this.addOrUpdateBtn = 'Update';
        if (selectedProject.startDate == null && selectedProject.endDate == null) {
            dateCheckBox =  false;
        }
        this.addProjectForm.setValue({
            projectNameControl: selectedProject.projectName,
            checkDatesControl: dateCheckBox,
            startDateControl: null,
            endDateControl: null,
            priorityControl: selectedProject.priority,
            selectedManagerControl: selectedProject.manager,
            priorityDisplayControl: selectedProject.priority
        });
        this.setDate(selectedProject.startDate, 'startDateControl');
        this.setDate(selectedProject.endDate, 'endDateControl');
        
    }

    setDate(date: String, dateControl: String): void {
        let getDate = new Date(parseInt(date.substring(6)), parseInt(date.substring(3, 5)) - 1, parseInt(date.substring(0, 2)));
        if (dateControl == 'startDateControl') {
            this.addProjectForm.patchValue({
                startDateControl: {
                    date: {
                        year: getDate.getFullYear(),
                        month: getDate.getMonth() + 1,
                        day: getDate.getDate()
                    }
                }
            });
        } else if (dateControl == 'endDateControl') {
            this.addProjectForm.patchValue({
                endDateControl: {
                    date: {
                        year: getDate.getFullYear(),
                        month: getDate.getMonth() + 1,
                        day: getDate.getDate()
                    }
                }
            });
        }
    }

    // setDate(): void {
    //     // Set today date using the patchValue function
    //     let date = new Date();
    //     console.log(date);
    //     this.addProjectForm.patchValue({startDateControl: {
    //     date: {
    //         year: date.getFullYear(),
    //         month: date.getMonth() + 1,
    //         day: date.getDate()}
    //     }});
    //     console.log(date);
    // }

    // clearDate(): void {
    //     // Clear the date using the patchValue function
    //     this.addProjectForm.patchValue({myDate: null});
    // }


    // slider controls
    sliderOnChange(event) {

    }

    sliderOnFinish(event) {
        
    }

    sliderOnUpdate(event) {
        
    }
   

    assignManager(mgrName , empId) {
        this.mgrName = mgrName;
        this.addProjectForm.patchValue({
            selectedManagerControl: empId
        });
    }

}