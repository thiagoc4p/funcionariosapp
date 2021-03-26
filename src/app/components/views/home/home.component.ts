import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/shared/model/funcionario.model';
import { FuncionarioService } from 'src/app/shared/service/funcionario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public funcionarios: Funcionario[];


  ngOnInit() {
    this.getFuncionarios();
  }

  constructor(private funcioarioService: FuncionarioService){}

  public getFuncionarios(): void {
    this.funcioarioService.getFuncionario().subscribe(
      (response: Funcionario[]) => {
        this.funcionarios = response;
        console.log(this.funcionarios);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
