import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() username: string = "";
  @Input() password: string = "";
  @Input() confirmPassword: string = "";
  @Input() donor: boolean = false;
  @Input() volunteer: boolean = false;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    if (this.password != this.confirmPassword) {
      alert("Passwords do not match");
      this.password = "";
      this.confirmPassword = "";
      return;
    }

    if (!this.donor && !this.volunteer) {
      alert("Must select donor or volunteer");
      return;
    }

    let type: string = "";
    if (this.donor && this.volunteer) {
      type = "both";
    } else if (this.donor) {
      type = "donor";
    } else {
      type = "volunteer";
    }

    let user: User = {
      username: this.username,
      password: this.password,
      type: type
    };

    this.usersService.create(user, (user: User) => {
      console.log(`Hello ${user.username}`);
      this.router.navigateByUrl('home');
    })
  }
}
