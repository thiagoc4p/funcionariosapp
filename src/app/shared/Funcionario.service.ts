import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from './Funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  apiUrl = 'http://localhost:8080/api';

  httOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  public getFuncionario(): Observable<Funcionario[]> {
    return this.httpClient.get<Funcionario[]>(`${this.apiUrl}/funcionario`);
  }
  
  public addFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.post<Funcionario>(`${this.apiUrl}/funcionario`, funcionario);
  }

  public updateFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.put<Funcionario>(`${this.apiUrl}/funcionario/update`, funcionario);
  }

  public deleteFuncionario(funcionarioId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/funcionario/delete/${funcionarioId}`);
  }

}