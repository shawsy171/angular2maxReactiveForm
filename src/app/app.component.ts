import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenNames: string[] = ['Chris', 'Anna'];
  
  ngOnInit () {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNameValidator.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male'), 
      'hobbies': new FormArray([])
    });

    // // state of the form 
    // this.signupForm.valueChanges.subscribe(
    //   (value) => {
    //     console.log(value);
    //   }
    // );
    
    // state of the form 
    this.signupForm.statusChanges.subscribe(
      (status) => {
        console.log(status);
      }
    );

    this.signupForm.setValue({
      'userData': {
        'username': 'Damien',
        'email': 'damien@mail.com'
      },
      'gender': 'male',
      'hobbies': []
    });
    
    this.signupForm.patchValue({
      'userData': {
        'username': 'Peter',
      }
    });
  }

  onSubmit () {
    console.log(this.signupForm);
  }

  onAddHobby () {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
    // <FormArray> this is type casting type script
  }
  
  forbiddenNameValidator (control: FormControl): {[s: string]: boolean} {

    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }

    return null;
  }

  forbiddenEmails (control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
