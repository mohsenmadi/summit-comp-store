import { Component } from '@angular/core';
import { OperationsService } from "../operations.service";

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss'],
  providers: [OperationsService]
})
export class OwnerComponent {
  earnings$ = this.store.earnings$;

  constructor(private store: OperationsService) {
  }
}
