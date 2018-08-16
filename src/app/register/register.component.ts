import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../common-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [CommonDataService]
})
export class RegisterComponent implements OnInit {


  registrationForm;
  otpForm;
  verifyForm;
  constructor(private commonDataService: CommonDataService, private fb: FormBuilder) {
    this.otpForm = fb.group({
      'mobileNo':  [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)])],
    });

    this.verifyForm = fb.group({
      'otp':  [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(3), Validators.maxLength(6)])],
    });
    
    this.registrationForm = fb.group({
      'firstName': [null, Validators.required],
      'middleName': [null, Validators.required],
      // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
      'lastName': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      'gender': ["Male", Validators.required],
      'hiking': false,
      'running': false,
      'swimming': false
    });
  }
  ngOnInit() {

  }

  getOtp(form: any): void {
    console.log("Form Data")
    console.log(form.mobileNo);
    this.commonDataService
    .getOtp(form.mobileNo)
    .subscribe(
      (userStatus) => {
       console.log(userStatus)
      }
    );
  }

  submitForm(form: any): void {
    console.log('Form Data: ');
    console.log(form);
  }





}
