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

  responseMsg: String = 'Enter mobile number and generate the OTP.';
  userStatus: String = "";
  otpDisable: Boolean = true;
  formEnable: Boolean = true;


  constructor(private commonDataService: CommonDataService, private fb: FormBuilder) {
    this.otpForm = fb.group({
      'mobileNo': [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)])],
    });

    this.verifyForm = fb.group({
      'otp': [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(3), Validators.maxLength(6)])],
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
    console.log("Mobile No:" + form.mobileNo);
    this.responseMsg = ''
    this.commonDataService
      .getOtp(form.mobileNo)
      .subscribe(
        (response) => {
          try{
            if (response.userStatus == 'CREATE_NEW_USER') {
              this.otpDisable = true;
              this.responseMsg = "Please fill below details!";
        
            } 
            else if (response.userStatus == 'OTP_SENT') {
              this.otpDisable = false;
              this.responseMsg = "Please enter OTP which you recived on your mobile!";
            }
            else {
              this.responseMsg = "Please enter valid Mobile Number";
            }
          }
          catch(e){
            console.log("getOTP API response Error :" + e)
          }
        }
      );
    
  }


  verifyOtp(form: any): void {
    this.responseMsg = '';
    console.log("OTP:" + form.otp);
    this.commonDataService
      .verifyOtp({mobile:9823611942, otp:  form.otp})
      .subscribe(
      (response) => {
        console.log(response)
        this.onVerifyOtpResponse(response.userStatus)
      }
      );
    this.onVerifyOtpResponse('USER_EXISTS')
  }

  onVerifyOtpResponse(userStatus: String) {

    if (userStatus == 'CREATE_NEW_USER') {
      this.responseMsg = "Please fill below details and submit!";
    }
    if (userStatus == 'USER_EXISTS') {
      this.responseMsg = "Please print your application";
    } else {
      this.responseMsg = "Please enter valid Mobile Number and OTP";
    }


  }





  submitForm(form: any): void {
    console.log('Form Data: ');
    console.log(form);
  }





}
