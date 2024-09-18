import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
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

  onSubmit() {
    console.log('Handling the form submission');
    console.log(this.checkoutFormGroup.get('customer')?.value);
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

}
