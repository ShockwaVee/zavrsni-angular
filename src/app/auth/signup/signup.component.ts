import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  subscription = new Subscription;

  @ViewChild('errorMessage') error;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.subscription = this.authService.error_message.subscribe((error) => {
      if (error == 'auth/invalid-email') this.error.nativeElement.innerHTML = "E-mail adresa je loše formatirana.";
      else if (error == 'auth/weak-password') this.error.nativeElement.innerHTML = "Lozinka mora imati najmanje 6 znakova";
      else this.error.nativeElement.innerHTML = error;
    })
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;
    const surname = form.value.surname;
    this.authService.signUpUser(email, password, name, surname);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
