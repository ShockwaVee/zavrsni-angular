import {Component, OnInit} from "@angular/core";
import * as firebase from "firebase";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor() {
  }


  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDYgOyH3PI85yE47QYAhT6ajfadRqmxKtM",
      authDomain: "zavrsni-rad-f80a0.firebaseapp.com",
    });
  }
}
