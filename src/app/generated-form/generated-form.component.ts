import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {QuestionsService, Question} from '../services/question.services';

@Component({
  selector: 'pjm-generated-form',
  styleUrls: ['generated-form.component.css'],
  templateUrl: 'generated-form.component.html'
})
export class GeneratedFormComponent implements OnInit {
  answerSummary: any[];
  showSummary = false;
  questionsForm: FormGroup;
  questions: Question[];
  constructor(private questionService: QuestionsService) {
    this.questionsForm = new FormGroup({});
  }
  ngOnInit() {
    this.questions = this.questionService.loadQuestions();
    for (const question of this.questions) {
      const formControl = this.createControl(question);
      this.questionsForm.addControl(question.id, formControl);
    }

  } 
  private createControl(question: Question): FormControl {
    const validators = [];
    if (question.required) {
      validators.push(Validators.required);
    }
    return new FormControl('', validators);
  }

  saveForm(formValue: any) {
    console.log(formValue);

    this.questionService.saveAnswers(formValue);
    this.answerSummary = this.questions.map(question => {
      return {
        text: question.text,
        answer: formValue[question.id]
      };
    });
    this.showSummary = true;
  }

  backToForm() {
    this.showSummary = false;
    this.questionsForm.reset({});
  }

}
