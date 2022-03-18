import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Class } from 'src/app/Models/Class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  baseUrl = `https://localhost:44347/api/Classes`;





  constructor(
    private http: HttpClient) {

   }
   getAll(): Observable<Class[]>{
    return this.http.get<Class[]>(this.baseUrl);
  }

  getId(id:number): Observable<Class>{
    return this.http.get<Class>(`${this.baseUrl}/${id}`);
  }

   addPost(classe: Class): Observable<Class>{
     return this.http.post<Class>(`${this.baseUrl}/`,classe);

   }



   addPut(id:number,classe: Class){
     return this.http.put(`${this.baseUrl}/${id}`,classe);

   }

   excluir(id: number, classe: Class){
    return this.http.put(`${this.baseUrl}/${id}/status`, classe);
  }










}
