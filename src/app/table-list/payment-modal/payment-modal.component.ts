import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'app/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { MakePayment } from 'app/model/make.model';



@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {
  @Input() id;
  form: FormGroup;
  isDisable = false;

  constructor(public activeModal: NgbActiveModal,private _fb: FormBuilder,private apiService : ApiserviceService,private toastr: ToastrService) { 
    this.form = this._fb.group({
      apiKey: ['', Validators.required],
      schedule: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }
  destroyModal(): void {
  }
  payment() {
    
    this.isDisable = true;
    var makePayment = new MakePayment;
    makePayment.employeeId=this.id;
    makePayment.service = Number(this.form.controls.schedule.value);
    makePayment.serviceType = Number(this.form.controls.type.value);
    this.apiService.makePayment(makePayment).subscribe(res=>{
      this.toastr.success('Payment', 'In process');
      this.activeModal.close();
      this.isDisable = false;
    })
    error =>{
      this.toastr.error('Error', 'Something went wrong');
      this.isDisable = false;
    };



  }

}
