// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   ReactiveFormsModule,
// } from '@angular/forms';
// import { Router } from '@angular/router';

// import { AuthService } from '../../../core/services/auth.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })
// export class LoginComponent implements OnInit {
//   loginForm!: FormGroup;
//   isSubmitting = false;
//   errorMessage = '';

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//     });
//   }

//   onSubmit(): void {
//     if (this.loginForm.invalid || this.isSubmitting) {
//       this.loginForm.markAllAsTouched();
//       return;
//     }

//     this.isSubmitting = true;
//     this.errorMessage = '';

//     this.authService.login(this.loginForm.value).subscribe({
//       next: () => {
//         this.router.navigateByUrl('/admin');
//       },
//       error: (err) => {
//         this.errorMessage =
//           err?.error?.message || 'Invalid admin credentials';
//         this.isSubmitting = false;
//       },
//       complete: () => {
//         this.isSubmitting = false;
//       },
//     });
//   }
// }
