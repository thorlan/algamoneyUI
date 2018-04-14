
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ViaCepEndereco } from './../models/endereco.model';

@Injectable()
export class ViaCepService {

  constructor(private httpClient: HttpClient) { }

  getAddressByZipCode(zipcode: string): Observable<ViaCepEndereco> {
    return this.httpClient.get<ViaCepEndereco>(`https://viacep.com.br/ws/${zipcode}/json/`);
  }

}
