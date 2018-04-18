import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../utilities/model';

@Component({
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
    public addOrUpdateBtn: string = 'Add';
    private addUserForm: FormGroup;
    private usersList: UserModel[] = [
        { userId: 1, firstName:'vijay', lastName: 'varma', employeeId: 345, projectId: 1, taskId: 1},
        { userId: 2, firstName:'john', lastName: 'doe', employeeId: 234, projectId: null, taskId: 2},
    ];

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.addUserForm = this.formBuilder.group({
            firstNameControl: [null, Validators.required],
            lastNameControl: [null, Validators.required],
            empIdControl: [null, Validators.required]
        });
    }

    // addUser - FormGroup
    addUserSubmit() {
        console.log(this.addUserForm);
    }

    addUserReset() {
        this.addUserForm.reset();
        this.addOrUpdateBtn = 'Add';
    }

    editUser(userId) {
        let selectedUser = null;
        this.usersList.forEach(user => {
            if (user.userId == userId) {
                selectedUser = user;
            }
        });
        this.addOrUpdateBtn = 'Update';
        this.addUserForm.reset();
        this.addUserForm.setValue({
            firstNameControl: selectedUser.firstName,
            lastNameControl: selectedUser.lastName,
            empIdControl: selectedUser.employeeId
        });
    }

    deleteUser(empId) {
        
    }
}