import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { showErrorAlert } from 'src/app/shared/utils/swal';

@Component({
  templateUrl: './login-page.component.html',
  styles: [],
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  isValidField(field: string): boolean {
    return (
      !!this.myForm.controls[field].errors &&
      this.myForm.controls[field].touched
    );
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const username = this.myForm.controls['username'].value;
    const password = this.myForm.controls['password'].value;

    if (username.trim().length === 0 && password.trim().length === 0) return;

    this.authService
      .login(username, password)
      .pipe(catchError((err) => showErrorAlert(err)))
      .subscribe((token) => {
        if (token) this.router.navigate(['/dashboard/home']);
      });
  }
}
