import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  countries: Country[] = [];
  states: State[] = [];

  constructor(private formBuilder: FormBuilder,
              public formService: FormService ) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('',[Validators.required, Validators.email])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2)]),
        city: new FormControl('', [Validators.required, Validators.minLength(2)]),
        state: new FormControl('', Validators.required ),
        country: new FormControl('', Validators.required ),
        zipcode: new FormControl('', [Validators.required, Validators.minLength(2)])
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    // populate credit card years and months
    const startMonth: number = new Date().getMonth() + 1;
    console.log("Start Month is" + startMonth);

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log(`retrieved months are ` + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    this.formService.getCreditCardYears().subscribe(
      data =>{
        console.log("The retrieved years are: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

    //populate the countries
    this.formService.getCountries().subscribe(
      data => {
        console.log(`the countries are: ` + JSON.stringify(data));
        this.countries = data;
      }
    );
  
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }

  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }

  get email() { return this.checkoutFormGroup.get('customer.email'); }

  onSubmit() {
    console.log('Handling the form submission');

    if( this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }

    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log('Country is : ' + this.checkoutFormGroup.get('shippingAddress')!.value.country.name);
    console.log('State is : ' + this.checkoutFormGroup.get('shippingAddress')!.value.state.name) ;

  }

  handleMonthsAndYears() {
    
    const formGroup = this.checkoutFormGroup.get('creditCard');

    const currYear: number = new Date().getFullYear();
    const selectedYear: number = Number(formGroup!.value.expirationYear);

    let startMonth: number;

    if(currYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    }else{
      startMonth = 1;
    }
    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )
  }

  getStates() {

    const formGroup = this.checkoutFormGroup.get('shippingAddress');

    const countryCode = formGroup!.value.country.code;
    const countryName = formGroup!.value.country.name;

    console.log(`ShippingAddress: country code: ${countryCode}`);
    console.log(`ShippingAddress: country name: ${countryName}`);

    this.formService.getStates(countryCode).subscribe(
      data=> {
        console.log(`The states are : ` + JSON.stringify(data));
        this.states = data;
    
        // set first item as default
        formGroup?.get('state')?.setValue(data[0]);
      }
    );

  }

}
