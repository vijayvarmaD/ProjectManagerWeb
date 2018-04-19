import { Component } from '@angular/core';
import { TaskModel, ProjectModel } from '../../utilities/model';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Router } from '@angular/router';
import { DataService } from '../../utilities/data.service';

@Component({
    templateUrl: './view-task.component.html',
    styleUrls: ['./view-task.component.css']
})

export class ViewTaskComponent  {
    tasksList: TaskModel[] = [
        { taskId: 1, parentId: 1, projectId: 1, task: 'task 1', priority: 25 , startDate: '02/03/2018' , endDate: '02/03/2018', status: 'completed'},
        { taskId: 1, parentId: 1, projectId: 1, task: 'task 2', priority: 22 , startDate: '02/03/2018' , endDate: '02/03/2018', status: 'completed'},
    ];

    projectsList: ProjectModel[] = [
        { projectId: 1, project:'proj1', startDate: '02/03/2018', endDate: '03/03/2018', priority: 24, manager: 2, managerName: 'john doe'},
        { projectId: 2, project:'proj2', startDate: '02/03/2018', endDate: '03/03/2018', priority: 12, manager: 1, managerName: 'vijay varma'},
    ];

    selectedProject: String;
    selectedProjectId: Number;

    constructor(private router: Router,private dataService: DataService) {}

    assignProject(projName, projId) {
        this.selectedProjectId = projId;
        this.selectedProject = projName;
        // call service to get tasks for the project & assign to tasksList
    }

    editTask(taskId) {
        this.router.navigate(['/edittask']);
        // this.dataService.changeMessage("Hello from Sibling");
        let taskBlock = null;
        this.tasksList.forEach(task => {
            if (taskId === task.taskId) {
                let selectedTask = task;
                taskBlock = task;
                taskBlock.formMode = 'Edit Task';
                taskBlock.btnMode = 'Update';
                taskBlock.selectedProject = this.selectedProject;
                taskBlock.selectedProjectId = this.selectedProjectId;
            }
        });
        this.dataService.sendTaskBlock(taskBlock);
    }
}