import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { showURLImage } from 'src/app/shared/utils/swal';
import { environment } from 'src/environments/environments';
import { Config } from '../../../interfaces/config.interface';
import { ApiService } from '../../../services/api.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

const noHtmlOrSlashValidator = (control: FormControl) => {
  const value = control.value as string;
  if (
    value &&
    (value.includes('<') || value.includes('>') || value.includes('/'))
  ) {
    return { invalidInput: true };
  }
  return null;
};

@Component({
  templateUrl: './home-image-page.component.html',
  styles: [],
})
export class HomeImagePageComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private validatorsService = inject(ValidatorsService);
  public myForm: FormGroup = this.fb.group({
    config: ['', Validators.required],
    text1: ['', [Validators.required, noHtmlOrSlashValidator]],
    text2: ['', [Validators.required, noHtmlOrSlashValidator]],
  });

  public availableConfigs: Config[] | null = [];
  public loading: boolean = false;

  public customErrorMessages = {
    required: 'Campo requerido',
    invalidInput: 'El campo contiene caracteres inválidos.',
  };

  ngOnInit(): void {
    this.getConfigsList();
  }

  getConfigsList() {
    this.loading = true;
    this.apiService.getConfigs().subscribe((configs) => {
      this.availableConfigs = configs;
      this.loading = false;
    });
  }

  isValidField(field: string): boolean {
    return this.validatorsService.isValidField(this.myForm, field);
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
