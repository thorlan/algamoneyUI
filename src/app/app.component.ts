// Angular imports
import { Component } from '@angular/core';

// External imports
import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { Router } from '@angular/router';

// My imports


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
      private toastyService: ToastyService,
      private toastyConfig: ToastyConfig,
      private router: Router) {

        this.toastyConfig.theme = 'bootstrap';
}

  exibindoNavBar() {
    return this.router.url !== '/login';
  }

}
