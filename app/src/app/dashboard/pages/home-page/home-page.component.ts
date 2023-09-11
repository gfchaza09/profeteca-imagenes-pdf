import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { showURLImage } from 'src/app/shared/utils/swal';
import { environment } from 'src/environments/environments';
import { Config } from '../../interfaces/config.interface';
import { ApiService } from '../../services/api.service';

@Component({
  templateUrl: './home-page.component.html',
  styles: [],
})
export class HomePageComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  public myForm: FormGroup = this.fb.group({
    config: ['', Validators.required],
    text1: ['', Validators.required],
    text2: ['', Validators.required],
  });

  public availableConfigs: Config[] = [];

  ngOnInit(): void {
    this.apiService
      .getConfigs()
      .subscribe((configs) => (this.availableConfigs = configs));
  }

  isValidField(field: string): boolean {
    return (
      !!this.myForm.controls[field].errors &&
      this.myForm.controls[field].touched
    );
  }

  generateImage() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const config = this.myForm.get('config')?.value;
    const text1 = this.myForm.get('text1')?.value;
    const text2 = this.myForm.get('text2')?.value;

    const imagePath = `${this.apiUrl}/imagen/${config}/${text1}/${text2}/img.jpg`;

    showURLImage(imagePath);
  }
}
