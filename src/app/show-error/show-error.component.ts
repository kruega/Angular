import { Component, Input, Optional } from '@angular/core';
import { NgForm, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'pjm-show-error',
  template: `
  <div *ngIf="errorMessages" class="alert alert-danger">
    <div *ngFor="let errorMessage of errorMessages">
    {{errorMessage}}
    </div>
  </div> ` })

export class ShowErrorComponent {
    @Input('path') path;
    @Input('text') displayName= '';
    constructor(@Optional() private ngForm: NgForm,
                @Optional() private formGroup: FormGroupDirective) { }

    get errorMessages(): string[] {
      let form: FormGroup;
      if (this.ngForm) {
        form= this.ngForm.form;
      } else {
        form= this.formGroup.form;
      }
      const control = form.get(this.path);
      const messages = [];
      if (!control || !(control.touched) || !control.errors) {
        return null;
      }
      for (const code in control.errors){

      }
      for (const code in control.errors) {
        if (control.errors.hasOwnProperty(code)) {
          const error = control.errors[code];
          let message = '';
          switch (code) {
            case 'required':
              message = `${this.displayName} ist ein Pflichtfeld`;
              break; //Auswertung des fehlercodes
            case 'minlength':
              message = `${this.displayName} muss mindestens 
                        ${error.requiredLength} Zeichen enthalten`;
              break;
            case 'invalidEmail':
              message = `Bitte geben Sie eine gültige E-mail-Adresse an`;         
              break;
          default:
            message = `${name}ist nicht valide`;
            case 'userNotFound':
            message = `Der eingetragene Benutzer existiert nicht.`;
            break;
          }
          messages.push(message);
        }    
      }
      return messages;
    }
}

