import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Address } from './../../../../models/address.model';
import { Component, OnInit, NgZone, ViewChild, ElementRef, Inject } from '@angular/core';

import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-pesquisar-endereco',
  templateUrl: './pesquisar-endereco.component.html',
  styleUrls: ['./pesquisar-endereco.component.css']
})
export class PesquisarEnderecoComponent implements OnInit {

  @ViewChild('search') public searchElement: ElementRef;

  address: Address = new Address();

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public dialogRef: MatDialogRef<PesquisarEnderecoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(
      () => {
        // tslint:disable-next-line:prefer-const
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['(cities)'] });

        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            // tslint:disable-next-line:prefer-const
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            autocomplete.getPlace().address_components.forEach(
              (addressComponent) => {

                if (addressComponent.types[0] === 'country') {
                  this.address.pais = addressComponent.long_name;
                } else if (addressComponent.types[0] === 'administrative_area_level_1') {
                  this.address.estado = addressComponent.long_name;
                } else if (addressComponent.types[0] === 'locality') {
                  this.address.cidade = addressComponent.long_name;
                }
              }
            );

            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setEndereco() {
    if (this.address.pais && this.address.estado && this.address.cidade) {
      this.dialogRef.close(this.address);
    }
  }

}
