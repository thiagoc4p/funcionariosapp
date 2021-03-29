import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Funcionario } from './shared/Funcionario.model';
import { FuncionarioService } from './shared/Funcionario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public funcionarios: Funcionario[];
  public deleteFuncionario: Funcionario;
  public updateFuncionario: Funcionario;

  constructor(public funcioarioService: FuncionarioService) { }

  ngOnInit() {
    this.getFuncionarios();
  }
  
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
  
  public onAddFuncionario(addForm: NgForm): void {
    document.getElementById('add-funcionario-form').click();
    this.funcioarioService.addFuncionario(addForm.value).subscribe(
      (response: Funcionario) => {
        console.log(response);
        this.getFuncionarios();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(funcionario: Funcionario): void {
    this.funcioarioService.updateFuncionario(funcionario).subscribe(
      (response: Funcionario) => {
        console.log(response);
        this.getFuncionarios();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(funcionarioId: number): void {
    this.funcioarioService.deleteFuncionario(funcionarioId).subscribe(
      (response: void) => {
        console.log(funcionarioId);
        this.getFuncionarios();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public buscarFuncionarios(key: string): void {
    console.log(key);
    const results: Funcionario[] = [];
    for (const employee of this.funcionarios) {
      if (employee.nome.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.cargo.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.funcionarios = results;
    if (results.length === 0 || !key) {
      this.getFuncionarios();
    }
  }

  public onOpenModal(funcionario: Funcionario, modo: String): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (modo === 'add') {
      button.setAttribute('data-target', '#addModal');
    }
    if (modo === 'update') {
      this.updateFuncionario = funcionario;
      button.setAttribute('data-target', '#updateModal');
    }
    if (modo === 'delete') {
      this.deleteFuncionario = funcionario;
      button.setAttribute('data-target', '#deleteModal');
    }

    container.appendChild(button);
    button.click();

  }
}
