import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  subscription = new Subscription;

  @ViewChild('errorMessage') error;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.subscription = this.authService.error_message.subscribe((error) => {
      if (error == 'auth/user-not-found')
        this.error.nativeElement.innerHTML = 'Pogrešna e-mail adresa ili lozinka.';
      else if (error == 'auth/invalid-email') this.error.nativeElement.innerHTML = "E-mail adresa je loše formatirana.";
    })
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signInUser(email, password);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
