import { Component } from '@angular/core';
import { TaskModel, ProjectModel } from '../../utilities/model';

@Component({
    templateUrl: './view-task.component.html',
    styleUrls: ['./view-task.component.css']
})

export class ViewTaskComponent  {
    tasksList: TaskModel[] = [
        { taskName: 'task 1', parentTask: 'p task1', priority: 25 , startDate: '02/03/2018' , endDate: '02/03/2018'},
        { taskName: 'task 2', parentTask: 'p task1', priority: 22 , startDate: '02/03/2018' , endDate: '02/03/2018'},
    ];

    projectsList: ProjectModel[] = [
        { projectName:'proj1', totalTasks: 1, startDate: '02/03/2018', endDate: '03/03/2018', completed: 'completed', priority: 24, manager: 345},
        { projectName:'proj2', totalTasks: 1, startDate: '02/03/2018', endDate: '03/03/2018', completed: 'completed', priority: 12, manager: 234},
    ];

    selectedProject: String;

    assignProject(projName) {
        this.selectedProject = projName;
        // call service to get tasks for the project
    }
}