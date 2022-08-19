import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {Observable} from 'rxjs';

const apiUrl = environment.apiAddress;


@Injectable({
	providedIn: 'root'
})
export class ApiService {
	constructor(private http: HttpClient) {
	}

	public get<T>(url: string, options = {}): Observable<T> {

		return this.http.get<T>(`${apiUrl}/${url}`, options);
	}

	public post<T>(url: string, body: unknown, options = {}): Observable<T> {
		return this.http.post<T>(`${apiUrl}/${url}`, body, options);
	}

	public put<T>(url: string, body: unknown, options = {}): Observable<T> {
		return this.http.put<T>(`${apiUrl}/${url}`, body, options);
	}

	public delete<T>(url: string, options = {}): Observable<T> {
		return this.http.delete<T>(`${apiUrl}/${url}`, options);
	}
}
