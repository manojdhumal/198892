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
  formDisable: Boolean = true;
  mobile:Number;

  userForm={ 
              mobile:'', middleName: '', addressLine1 : "", addressLine2 : "", city : "", country : "",
              createDt : "", dateOfBirth : "", domicile : "", emailAddr : "" , gender : "",
              idType : "", idTypeNumber : "", lastName : "", maritalStatus : "" ,  nationality : "",
              otp : 0, physicallyChallenged : "", pinCode : '', qualification : "", qualificationOther : "", registrationId : '',
              retryCount : 0, state : "", tranAmount : null, tranDate : null, tranId : null, tranStatus : "" 
            }

  constructor(private commonDataService: CommonDataService, private fb: FormBuilder) {
    this.otpForm = fb.group({
      'mobile': [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)])],
    });

    this.verifyForm = fb.group({
      'otp': [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(3), Validators.maxLength(6)])],
    });

    this.registrationForm = fb.group({
      'firstName': [null, Validators.required],
      'middleName': [null, Validators.required],
      // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
      'lastName': [null, Validators.required], //Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
      'gender': ["Male", Validators.required],
       addressLine1 : "", addressLine2 : "", city : "", country : "",
      createDt : "", dateOfBirth : "", domicile : "", emailAddr : "" ,
      idType : "", idTypeNumber : "",  maritalStatus : "" , mobile :'' , nationality : "",
      otp : 0, physicallyChallenged : "", pinCode : '', qualification : "", qualificationOther : "", registrationId : 0,
      retryCount : 0, state : "", tranAmount : null, tranDate : null, tranId : null, tranStatus : "" 
     
    });
  }
  ngOnInit() {

  }

  getOtp(form: any): void {
    console.log("Mobile No:" + form.mobile);
    this.responseMsg = ''
    this.mobile=form.mobile;
    this.userForm.mobile=form.mobile;
    this.commonDataService
      .getOtp(form.mobile)
      .subscribe(
        (response) => {
          try{
            if (response.userStatus == 'CREATE_NEW_USER') {
              this.otpDisable = true;
              this.formDisable=false;
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
      .verifyOtp({mobile:this.mobile, otp:  form.otp})
      .subscribe(
      (response) => {
        console.log(response)       
        if (response.userStatus == 'CREATE_NEW_USER') {
          this.responseMsg = "Please fill below details and submit!";
          this.formDisable=false;
        }
        if (response.userStatus == 'USER_EXISTS') {
          this.responseMsg = "Please print your application";
          this.formDisable=true;        
          this.userForm=response.userRegistrationDto;  
        } else {
          this.responseMsg = "Please enter valid Mobile Number and OTP";
        }
      }
      );   
  }

  saveUser(form: any): void {
    this.responseMsg = '';    
    console.log( this.userForm);
    this.commonDataService
      .saveUser(this.userForm)
      .subscribe(
      (response) => {
        console.log(response)       
        if (response.userStatus == 'USER_DETAIL_SAVED') {
          this.responseMsg = "Your details saved successfully!";         
        }
        else {
          this.responseMsg = "Please fill all required details and try again!";
        }
      }
      );   
  }
  userRegFormInit(userDet):void{
    console.log(userDet.firstName)      

  }

/*

{
    "userStatus": "USER_EXISTS",
    "userRegistrationDto": {
        "addressLine1": "B2-504, Mayur Kilbil",
        "addressLine2": "Dhanori",
        "city": "Pune",
        "country": "I",
        "dateOfBirth": "2018-08-15T00:00:00+05:30",
        "domicile": "Maharashtra",
        "emailAddr": "raj@gmail.com",
        "firstName": "Rajnish",
        "gender": "M",
        "idType": "P",
        "idTypeNumber": "456as78",
        "lastName": "Athanere",
        "maritalStatus": "M",
        "middleName": "Somarao",
        "mobile": 9823611942,
        "nationality": "I",
        "physicallyChallenged": "N",
        "pinCode": 411015,
        "qualification": "B.E.",
        "qualificationOther": "IAS",
        "registrationId": 0,
        "retryCount": 0,
        "state": "Maharashtra",
        "tranAmount": null,
        "tranDate": null,
        "tranId": null,
        "tranStatus": "N",
        "otp": 0,
        "createDt": "2018-08-15T18:04:20+05:30"
    }
}



*/


  submitForm(form: any): void {
    console.log('Form Data: ');
    console.log(form);
  }





}
