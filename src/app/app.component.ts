import { Component, OnInit, VERSION } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  reactiveForm: FormGroup;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      reactive_email: new FormControl("ishan@", [
        Validators.required,
        Validators.email,
        //bind this if this class var used inside this validarot
        this.forbiddenEmails.bind(this),
     
      ],
       this.forbiddenEmailsAsync
      )
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
    alert(JSON.stringify(form.value));
  }

  onSubmitReactive() {
    alert(JSON.stringify(this.reactiveForm.value));
  }

  //custom  validator
  forbiddenEmails(control: FormControl) {
    if (["ishan@1", "ishan@rox"].includes(control.value)) {
      //return error with true
      return { "cant use that": true };
    }
    //null or valid if ok
    return null;
  }

  //async validator
  forbiddenEmailsAsync(control: FormControl) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (["ishan@test"].includes(control.value)) {
          //return error with true
          resolve({ "cant use that": true });
        } else {
          //null or valid if ok
          resolve(null);
        }
      }, 5000);
    });
  }
}
