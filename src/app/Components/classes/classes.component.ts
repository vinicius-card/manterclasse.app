import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ClassesService } from '../../Service/classes.service';
import { Class } from '../../Models/Class';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  public classesFiltradas: Class [] = []
  public titulo = 'SISAUD | Parametrização';
  public classesSelecionada: string = '';
  private _filtroLista: string = '';
  public selectClass: Class = new Class();

  public modalRef = {} as BsModalRef;
  public message?: string;
  public classes : Class[] = [];


  public get filtroLista():string{
    return this._filtroLista;
  }

  public set filtroLista(value: string){
    this._filtroLista = value;
    this.classes = this.filtroLista ? this.filtrarClasse(this.filtroLista) : this.classes;

  }

  filtrarClasse(filtrarPor:string):any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.classes.filter(
      (classes: {id:number; descricao:string;}) => classes.descricao.toLocaleLowerCase().indexOf(filtrarPor)!== -1
    )
  }


  constructor(
    private fb:FormBuilder,
    public classesService: ClassesService,
    private modalService: BsModalService,
    private http: HttpClient){

    }


  ngOnInit() {
    this.carregarClasses();
    this.refreshObj();

  }
  refreshObj(){
    this.http.get(this.classesService.baseUrl).toPromise()
    .then(res => this.classes = res as Class[]);
  }


  objForm = this.fb.group({

    descricao: [],
  });


  public async carregarClasses(){
    await this.classesService.getAll().subscribe(
      (classes: Class []) => {
        this.classes = classes;
      },
      (erro: any) => {
        console.error(erro);
      });
    }

    public async getById(id:number){
    await this.classesService.getId(id).subscribe(res => {
      this.selectClass = res;
      console.log(this.selectClass)
    })
  }


  public async adcPost(){
    await this.classesService.addPost(this.objForm.value).subscribe(res => {

      this.refreshObj();
      this.voltar()
      this.carregarClasses();
      console.log(res);
    });
  }

  public async delete(classe: Class){
    await this.classesService.excluir(classe.id, classe).subscribe(res => {
      this.carregarClasses();
      console.log(res);

    })
  }



  classesSelect(classe:any){
    this.classesSelecionada = classe.descricao;
    this.objForm.patchValue(classe)
  }
  classSelect2(id:Class){
    this.getById(id.id)
  }


  voltar(){
    this.classesSelecionada = ''
  }


  classesSubmit(){
    this.saveClass(this.objForm.value)

  }


  alterarClasses(classe: Class){
    this.classesService.addPut(classe.id, classe).subscribe(
      (retorna) => {
        console.log(retorna);
        this.carregarClasses();
      },
      (erro:any) => {
        console.log(erro)
      });
    }



    saveClass(classe: Class){
      this.classesService.addPut(classe.id, classe).subscribe(
        (retorno:any) => {
          console.log(retorno);
        },
        (erro:any) => {
          console.log(erro);
        }
      )
    }




    //modal
    openModal(template: TemplateRef<any>):void {
      this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
      this.ngOnInit();
      this.delete(this.selectClass);
      this.modalRef?.hide();
    }

    decline(): void {
      this.modalRef?.hide();
    }

    /* public async dDelete(classe: Class){
      await this.classesService.delete(classe.id, classe).subscribe(res => {
        console.log(res);
      })
    } */

}
