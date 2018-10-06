import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../common-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contactForm;
  responseMsg='';
  date = new Date();
  constructor(private commonDataService: CommonDataService, private fb: FormBuilder) {
    this.contactForm = fb.group({
      'name':[null, Validators.compose([Validators.required,Validators.minLength(1), Validators.maxLength(25)])],
      'emailAddr':[null, Validators.compose([Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"),Validators.minLength(3), Validators.maxLength(25)])],
      'msg':[null, Validators.compose([Validators.required,Validators.minLength(1), Validators.maxLength(200)])],
      
    
    })
   }

   quickContact(form: any): void {
    console.log("qucik contact No:" + form.name);
    this.responseMsg = ''   
    this.commonDataService
      .quickContact(form)
      .subscribe(
      (response) => {
        try {
      //    if (response.status == '200') {           
            this.responseMsg = "Thank you for taking the time to provide us with your feedback."; 
            console.log("Response" + response)
            this.contactForm.reset()
       //   }
          // else {
          //   this.responseMsg = "Your feedback is valuable to us. We are facing technical issue, please try again later.";
          // }
        }
        catch (e) {
          console.log("getOTP API response Error :" + e)
          this.responseMsg = "Your feedback is valuable to us. We are facing technical issue, please try again later.";
        }
      }
      );

  }


  ngOnInit() {
  }
  ngAfterViewInit() {
    window.scrollTo(0, 0);
  } 
;



}
