import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';

type Step = 'intro' | 'email' | 'password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  step: Step = 'intro';
  email = '';
  password = '';

  goTo(next: Step) {
    gsap.to('.scene', {
      opacity: 0,
      y: -30,
      duration: 0.4,
      onComplete: () => {
        this.step = next;
        gsap.fromTo(
          '.scene',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5 }
        );
      }
    });
  }
}
