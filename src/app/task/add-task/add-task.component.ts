import { Component, OnInit, ChangeDetectorRef, OnDestroy, NgZone, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { ProjectModel, ParentTaskModel, UserModel } from '../../utilities/model';
import { Subject } from 'rxjs/Subject';
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../utilities/data.service';
import { Router } from '@angular/router';


@Component({
    selector: 'add-task', 
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})

export class AddTaskComponent implements OnInit {
    formMode: String = 'Add Task';
    btnMode: String = 'Add';

    selectedProject: string = '';
    selectedUser: string = '';
    selectedTask: string = '';
    selectedUserId: Number = null;
    selectedPTaskId: Number = null;
    selectedProjectId: Number = null;
    myOptions: INgxMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
    };
    projectsList: ProjectModel[] = [
        { projectId: 1, project:'proj1', startDate: '02/03/2018', endDate: '03/03/2018', priority: 24, manager: 2, managerName: 'john doe'},
        { projectId: 2, project:'proj2', startDate: '02/03/2018', endDate: '03/03/2018', priority: 12, manager: 1, managerName: 'vijay varma'},
    ];
    parentTasksList: ParentTaskModel[] = [
        { parentId: 1, parentTask: 'p-task1' },
        { parentId: 2, parentTask: 'p-task2' }
    ];
    usersList: UserModel[] = [
        { userId: 1, firstName:'vijay', lastName: 'varma', employeeId: 345, projectId: 1, taskId: 1},
        { userId: 2, firstName:'john', lastName: 'doe', employeeId: 234, projectId: 2, taskId: 2},
    ];
    private myForm: FormGroup;
    private addTaskForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private dataService: DataService,
        private router: Router
    ) {
        this.addTaskForm = this.formBuilder.group({
            ProjectIdControl: [null, Validators.required],
            TaskNameControl: [null, Validators.required],
            IsParentTaskControl: [null],
            PriorityControl: [null, Validators.required],
            PriorityDisplayControl: [null],
            ParentTaskControl: [null],
            StartDateControl: [null, Validators.required],
            EndDateControl: [null, Validators.required],
            UserIdControl: [null]
        });
        // this.dataService.currentMessage.subscribe(message => this.message = message)
        // // changes the form to edit mode and loads form values
        // AddTaskComponent.editFormDetails.subscribe(editForm => { 
        //         this.formMode = 'Edit Task';
        //         this.btnMode = 'Update';
        //         console.log(this.formMode)     
        // });

        // check the route for edit and then subscribe to data service
        if (this.router.url === '/edittask') {
            this.dataService.taskMessage.subscribe(editTaskMessage => {
                if (editTaskMessage !== null) {
                    let isParent;
                    if (editTaskMessage.parentId !== null) {
                        isParent = true;
                    } else  {
                        isParent = false;
                    }
                    this.formMode = editTaskMessage.formMode;
                    this.btnMode = editTaskMessage.btnMode;
                    this.addTaskForm.patchValue({
                        TaskNameControl: editTaskMessage.task,
                        PriorityControl: editTaskMessage.priority,
                        IsParentTaskControl: isParent                           
                    });
                    this.setDate(editTaskMessage.startDate, 'StartDateControl');
                    this.setDate(editTaskMessage.endDate, 'EndDateControl');
                    this.selectedProject = editTaskMessage.selectedProject;
                    console.log(this.addTaskForm);
                }    
            });
        }
        
    }

    ngOnInit() {
        // this.myForm = this.formBuilder.group({
        //     myDate: [null, Validators.required]
        // });   
    }

    setDate(date: String, dateControl: String): void {
        let getDate = new Date(parseInt(date.substring(6)), parseInt(date.substring(3, 5)) - 1, parseInt(date.substring(0, 2)));
        if (dateControl == 'StartDateControl') {
            this.addTaskForm.patchValue({
                StartDateControl: {
                    date: {
                        year: getDate.getFullYear(),
                        month: getDate.getMonth() + 1,
                        day: getDate.getDate()
                    }
                }
            });
        } else if (dateControl == 'EndDateControl') {
            this.addTaskForm.patchValue({
                EndDateControl: {
                    date: {
                        year: getDate.getFullYear(),
                        month: getDate.getMonth() + 1,
                        day: getDate.getDate()
                    }
                }
            });
        }
    }

    clearDate(): void {
        // Clear the date using the patchValue function
        // this.myForm.patchValue({myDate: null});
    }

    selectProject(projectName, projectId) {
        this.selectedProjectId = projectId;
        this.selectedProject = projectName;
        this.addTaskForm.patchValue({
            UserIdControl: projectId
        });
    }

    assignUser(userId, userName) {
        this.selectedUserId = userId;
        this.selectedUser =userName;
        this.addTaskForm.patchValue({
            ProjectIdControl: userId
        });
    }

    selectPTask(pTaskName, pTaskId) {
        this.selectedPTaskId = pTaskId;
        this.selectedTask = pTaskName;
        this.addTaskForm.patchValue({
            ParentTaskControl: pTaskId
        });
    }

    addTaskSubmit() {
        console.log(this.addTaskForm);
    }

    editMode(editForm) {
        
        this.formMode = 'Edit Task';
        this.btnMode = 'Update';
    }
}