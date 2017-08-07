import {Component, OnInit, Renderer2, ViewChild} from "@angular/core";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isOpen: boolean = false;

  constructor(private authService: AuthService, private renderer: Renderer2) {
  }

  @ViewChild('dropdown') dropdown;

  ngOnInit() {
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  isAdmin() {
    return this.authService.admin_rights;
  }

  onLogout() {
    this.authService.logOutUser();
  }

  onToggleDropdown() {
    if (this.isOpen) {
      this.renderer.removeClass(this.dropdown.nativeElement, 'in');
      this.isOpen = false;
    }
    else {
      this.renderer.addClass(this.dropdown.nativeElement, 'in');
      this.isOpen = true;
    }
  }
}
