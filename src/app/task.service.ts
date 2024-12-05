import { Injectable } from '@angular/core';
import { Observable, throwError  } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }


  getData(): Observable<any> {
    return this.http.get(this.apiUrl, { responseType: 'text' }).pipe(
      map(response => JSON.parse(response)) 
    ); 
//    return throwError(new Error('Erro forçado para testes'));
  }

  newTask(taskData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { value: taskData };
  
    return this.http.post<any>(this.apiUrl, body, { headers });
  }

  changeTask(taskData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/${taskData.id}`;
    return this.http.put<any>(url, taskData, { headers });
}
  
  deleteTask(taskData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/${taskData}`;
    return this.http.delete<any>(url, taskData);
   // return this.http.delete<any>(this.apiUrl, taskData);
  }
}
