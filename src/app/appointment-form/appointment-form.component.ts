// import { Component } from '@angular/core';
// import { MockDataService } from '../services/mock-data.service';

// @Component({
//   selector: 'app-appointment-form',
//   templateUrl: './appointment-form.component.html',
//   styleUrls: ['./appointment-form.component.scss']
// })
// export class AppointmentFormComponent {
//   availableHours: string[] = [];
//   selectedHour: string | undefined;
//   consultationFor: string | undefined;
//   name: string | undefined;
//   surname: string | undefined;
//   countryCode: string | undefined;
//   phoneNumber: string | undefined;
//   email: string | undefined;
//   additionalInfo: string | undefined;
//   isSubmitted: boolean = false;

//   constructor(
//     private mockDataService: MockDataService
//   ) {}

//   ngOnInit() {
//     this.fetchAvailableHours();
//   }

//   fetchAvailableHours() {
//     this.mockDataService.getDbData().subscribe(
//       (data: any) => {
//         if (data && data.availableHours) {
          
//           this.availableHours = data.availableHours;
//         }
//       },
//       (error) => {
       
//       }
//     );
//   }

//   submitForm() {
//     if (
//       this.selectedHour &&
//       this.consultationFor &&
//       this.name &&
//       this.surname &&
//       this.phoneNumber &&
//       this.email
//     ) {
 
//       const formData = {
//         selectedHour: this.selectedHour,
//         consultationFor: this.consultationFor,
//         name: this.name,
//         surname: this.surname,
//         phoneNumber: this.phoneNumber,
//         email: this.email,
//         additionalInfo: this.additionalInfo
//       };
  
    
//       console.log(formData);
  
     
//       this.resetForm();
//       this.isSubmitted = true;
//     }
//   }
// }