import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../common-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {IMyDpOptions} from 'mydatepicker';

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
  paymentForm;

  responseMsg: String = 'Enter mobile number and generate the OTP.';
  userStatus: String = "";
  otpDisable: Boolean = true;

  // formDisable: Boolean = false;
  //  mantoryDataNotSaved:boolean =false;

  formDisable: Boolean = true;
  mantoryDataNotSaved:boolean =true;
   
  printTabHide:boolean =true;


  mobile: Number;
  onlineType: Boolean = true;
  agreeValue: boolean = false;
  selectedTab = 1;
  selectedPersonal: boolean = true;
  lastVerifiedOtp: number;

  otherQulificationDisable:boolean =true;

  public model: any =  {date:  null };

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
   } ;

  userForm = {
    mobile: '', firstName: '', middleName: '', addressLine1: "", addressLine2: "", city: "", country: "India",
    createDt: "", dateOfBirth: "", domicile: "", emailAddr: "", gender: "Male",
    idType: "Pan Card", idTypeNumber: "", lastName: "", maritalStatus: "Married", nationality: "Indian",
    otp: 0, physicallyChallenged: "No", pinCode: '', qualification: "LLB", qualificationOther: "", registrationId: '',
    retryCount: 0, state: "Maharashtra", tranAmount: null, tranDate: null, tranStatus: "U",
    paymentType: 'Online', bankName: "", chequeDdNumber: "", tranId: "", 
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
      'middleName': "",
      // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
      'lastName': [null, Validators.required], //Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
      'gender': ["M", Validators.required],
      addressLine1: [null, Validators.required], addressLine2: "", 
      city:[null, Validators.required],
      country: [null, Validators.required],
      createDt: "", 
      dateOfBirth:[null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      domicile: "", 
      emailAddr:[null, Validators.compose([Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"),Validators.minLength(3), Validators.maxLength(50)])],
      idType: "",
      idTypeNumber:[null, Validators.required], maritalStatus: "",
      mobile:'', nationality: "",
      otp: 0, physicallyChallenged: "", 
      pinCode: [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)])], 
      qualification:'', qualificationOther: "", registrationId: 0,
      retryCount: 0, 
      state:[null, Validators.required], tranAmount: null, tranDate: null, tranId: null, tranStatus: ""


    });

    this.paymentForm = fb.group({
      'paymentType': ['Online', Validators.required],
      'bankName': [null, Validators.required],
      'tranId': [null, Validators.compose([ Validators.minLength(3), Validators.maxLength(20), Validators.required])],
      //'chequeDdNumber': [null, Validators.compose([ Validators.minLength(3), Validators.maxLength(20)])],
      

    })
  }
  ngOnInit() {   
   
  }

  setDate(): void {
    // Set today date using the patchValue function
    let date = new Date();
    this.registrationForm.patchValue({dateOfBirth: {
    date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()}
    }});
}

onDateChanged(event:any) {
  this.userForm.dateOfBirth= event.formatted;
  console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
}

clearDate(): void {
    // Clear the date using the patchValue function
    this.registrationForm.patchValue({dateOfBirth: null});
}


  getOtp(form: any): void {
    console.log("Mobile No:" + form.mobile);
    this.responseMsg = ''
    this.mobile = form.mobile;
    this.userForm.mobile = form.mobile;
    this.commonDataService
      .getOtp(form.mobile)
      .subscribe(
      (response) => {
        try {
          if (response.userStatus == 'CREATE_NEW_USER') {
            this.otpDisable = true;
            this.formDisable = false;
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
        catch (e) {
          console.log("getOTP API response Error :" + e)
        }
      }
      );

  }


  verifyOtp(form: any): void {
    this.responseMsg = '';
    console.log("OTP:" + form.otp);
    this.lastVerifiedOtp = form.otp;
    this.commonDataService
      .verifyOtp({ mobile: this.mobile, otp: form.otp })
      .subscribe(
      (response) => {
        console.log(response)
        if (response.userStatus == 'CREATE_NEW_USER') {
          this.responseMsg = "Please fill below details and submit!";
          this.formDisable = false;
        }
        if (response.userStatus == 'USER_EXISTS') {
          this.userForm = response.userRegistrationDto;
          if(this.userForm.tranStatus== "O" || this.userForm.tranStatus=="P"){
            this.responseMsg = "Please print your application details!";
            this.formDisable = false;
            this.selectedTab = 3;
            this.model= {date:  this.userForm.dateOfBirth };
            console.log(this.model)
            this.mantoryDataNotSaved = false;
            this.printTabHide= false;
          }else{
            this.responseMsg = "Please fill the payment details.";
            this.formDisable = false;
            this.selectedTab = 2;
            this.mantoryDataNotSaved = false;
            if(this.userForm.tranStatus== "O" || this.userForm.tranStatus=="P"){
              this.printTabHide= false;
            }
          }
          
        } else {
          this.responseMsg = "Please enter valid Mobile Number and OTP";
        }
      }
      );
  }

  saveUser(form: any): void {
    this.responseMsg = '';
    console.log(this.userForm);
   // this.userForm.dateOfBirth = this.userForm.dateOfBirth + 'T17:16:53Z';
    this.commonDataService
      .saveUser(this.userForm)
      .subscribe(
      (response) => {
        console.log(response)
        if (response.userStatus == 'USER_DETAIL_SAVED') {
          this.responseMsg = "Your details saved successfully!";
          this.selectedTab = 2;
          this.formDisable = false;
          this.mantoryDataNotSaved = false;
          if(this.userForm.tranStatus== "O" || this.userForm.tranStatus=="P"){
            this.printTabHide= false;
          }
        }
        else {
          this.responseMsg = "Please fill all required details and try again!";
          this.formDisable = false;
          this.mantoryDataNotSaved = true;
          this.printTabHide= true;
        }
      }
      );
  }
  userRegFormInit(userDet): void {
    console.log(userDet.firstName)


  }

  changeView(): void {
    this.userForm.bankName = "";
    this.userForm.tranId = "";
    this.userForm.chequeDdNumber = "";

    this.onlineType = true ? this.userForm.paymentType == 'Online' : false
  }


  changeQualificaion():void {
    console.log(this.userForm.qualification )
    if(this.userForm.qualification == 'Other'){
      this.otherQulificationDisable =false;
    }else{
      this.otherQulificationDisable =true;
      this.userForm.qualificationOther='';
    }

  }

   mydate() {
    //alert("");
    document.getElementById("dt").hidden = false;
    document.getElementById("ndt").hidden = true;
  }
  
   mydate1() {
    var d = new Date(document.getElementById("dt").nodeValue);
    var dt = d.getDate();
    var  mn = d.getMonth();
    mn++;
    var yy = d.getFullYear();
    document.getElementById("ndt").nodeValue = dt + "/" + mn + "/" + yy
    document.getElementById("ndt").hidden = false;
    document.getElementById("dt").hidden = true;
  }

  sendDetails(): void {
    console.log("send details" + this.userForm)
    this.responseMsg = '';
    this.userForm.otp = this.lastVerifiedOtp;
    this.commonDataService
      .sendDetails(this.userForm)
      .subscribe(
      (response) => {
        console.log(response)
        if (response.userStatus == 'EMAIL_SENT') {
          this.responseMsg = "Details sent to your Email and Mobile!";
          this.formDisable = false;
        }
        else {
          this.responseMsg = "Your OTP is not valid!";
          this.formDisable = false;
        }
      }
      );

  }

  submitPaymentDetails(userDet): void {

    console.log("submit details" + this.userForm.chequeDdNumber, " -->", this.userForm.tranId)
    this.userForm.otp = this.lastVerifiedOtp;
    // if(this.userForm.paymentType == "DD/Cheque" ){
    //   this.userForm.chequeDdNumber= this.userForm.tranId;
    //   this.userForm.tranId='';
    // }
    this.commonDataService
      .submitPaymentDetails(this.userForm)
      .subscribe(
      (response) => {
        console.log(response)
        if (response.userStatus == 'CREATE_NEW_USER') {
          this.responseMsg = "Please fill below details!";
          this.selectedTab = 1;
          this.formDisable = false;
          this.mantoryDataNotSaved = true;
        }
        if (response.userStatus == 'USER_EXISTS') {
          this.responseMsg = "Please print your application details!";
          this.selectedTab = 3;
          this.formDisable = false;
          this.userForm = response.userRegistrationDto;
          this.model= {date:  this.userForm.dateOfBirth };
          this.mantoryDataNotSaved = false;
          if(this.userForm.tranStatus== "O" || this.userForm.tranStatus=="P"){
            this.printTabHide= false;
          }
        } else {
          this.responseMsg = "Please enter valid Mobile Number and OTP";
          this.selectedTab = 2;
          
        }
      }
      );

  }


     printToCart(printSectionId: string){
      // let popupWinindow
      // let innerContents = document.getElementById(printSectionId).innerHTML;
      // popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      // popupWinindow.document.open();
      // var strHtml = "<html>\n<head>\n <link rel=\"stylesheet\" type=\"text/css\"  href=\"print.css\">\n</head><body><div style=\"testStyle\">\n"
      // + innerContents + "\n</div>\n</body>\n</html>";
      //  popupWinindow.document.writeln(strHtml);
      // //popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
      // popupWinindow.document.close();


      var innerContents = document.getElementById(printSectionId).innerHTML;
      var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="print.css" /></head><body onload="window.print()">' + innerContents + '</html>');
      popupWinindow.document.close();

}
  
  





}
