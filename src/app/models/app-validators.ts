import {Directive, forwardRef } from '@angular/core';
import {NG_ASYNC_VALIDATORS, NgForm, AbstractControl,NG_VALIDATORS,FormControl } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../services/user.service'
import 'rxjs/add/operator/map';

export function asyncIfNotBacklogThenAssignee(control): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(ifNotBacklogThanAssignee(control));
      }, 500);
    });
    return promise;
  }
  
  export function ifNotBacklogThanAssignee(formGroup: FormControl): {[key: string]: any} {
    const nameControl = formGroup.get('assignee.name');
    const stateControl = formGroup.get('state');
    if (!nameControl || !stateControl) {
      return null;
    }
    if (stateControl.value !== 'BACKLOG' &&
      (!nameControl.value || nameControl.value === '')) {
      return {'assigneeRequired': true};
    }
    return null;
  }

@Directive({
    selector: '[ifNotBacklogThanAssignee]',
    providers: [
      {
        provide: NG_VALIDATORS,
        useExisting: IfNotBacklogThanAssigneeValidatorDirective, multi: true
      }]
  })
  export class IfNotBacklogThanAssigneeValidatorDirective {
    
      public validate(formGroup: AbstractControl): {[key: string]: any} {
        const nameControl = formGroup.get('assignee.name');
        const stateControl = formGroup.get('state');
        if (!nameControl || !stateControl) {
          return null;
        }
        if (stateControl.value !== 'BACKLOG' &&
          (!nameControl.value || nameControl.value === '')) {
          return {'assigneeRequired': true};
        }
        return null;
      }
    }

    @Directive({
        selector: '[pjmEmailValidator]',
        providers: [{
          provide: NG_VALIDATORS,
          useValue: emailValidator, multi: true
        }]
      })
      export class EmailValidatorDirective {
        validate(control: AbstractControl): {[key: string]: any} {
          const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
          if (!control.value || control.value === '' || re.test(control.value)) {
            return null;
          } else {
            return {'invalidEMail': true};
          }
        }
      }
      
      export function emailValidator(control): {[key: string]: any} {
        return new EmailValidatorDirective().validate(control);
      }

      export function emailValidator2(control): {[key: string]: any} {
          const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
          if (!control.value || control.value === '' || re.test(control.value)) {
            return null;
          } else {
            return {'invalidEMail': true};
          }
        }

@Directive ({
        selector: '[pjmUserExistsValidator]',
        providers: [{
            provide: NG_ASYNC_VALIDATORS,
            useExisting: forwardRef(() => UserExistsValidatorDirective), multi: true
        }]
    })

export class UserExistsValidatorDirective {
    constructor(private userService: UserService){
    }
        validate (control: AbstractControl): Observable<any> {
            return this.userService.checkUserExists(control.value)
            .map(userExists => {
                return (userExists === false) ? {userNotfound: true} : null;
            });
        } 
}
    @Directive({
        selector: '[pjmEmailValidator]',
        providers: [
        {provide: NG_VALIDATORS, useValue: emailValidator, multi: true}
        ]
    })
  export class EmailValidatorWithFunctionDirective {
  }

export const APPLICATION_VALIDATORS = [IfNotBacklogThanAssigneeValidatorDirective,
                                        UserExistsValidatorDirective, EmailValidatorDirective];