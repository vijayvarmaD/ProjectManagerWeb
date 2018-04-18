import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { ProjectModel, ParentTaskModel, UserModel } from '../../utilities/model';


@Component({
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {
    pagename = 'add-task';
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

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        // this.myForm = this.formBuilder.group({
        //     myDate: [null, Validators.required]
        // });

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
    }

    setDate(): void {
        // Set today date using the patchValue function
        let date = new Date();
        // this.myForm.patchValue({myDate: {
        // date: {
        //     year: date.getFullYear(),
        //     month: date.getMonth() + 1,
        //     day: date.getDate()}
        // }});
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
}