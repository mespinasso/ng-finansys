import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entries";

  constructor(private http: HttpClient) { }

  // PUBLIC METHODS

  /**
   * Gets an array of all registered entries
   */
  getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    )
  }

  /**
   * Gets a entry by ID
   * @param id Entry ID
   */
  getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }

  /**
   * Creates a new entry into the database
   * @param entry Entry
   */
  create(entry: Entry): Observable<Entry> {
    return this.http.post(this.apiPath, entry).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }

  /**
   * Updates an existing entry by ID
   * @param entry Entry
   */
  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;

    return this.http.put(url, entry).pipe(
      catchError(this.handleError),
      map(() => entry)
    )
  }

  /**
   * Deletes entry from database
   * @param id Entry id
   */
  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  // PRIVATE METHODS

  /**
   * Converts json data into array of entries
   * @param jsonData Json data
   */
  private jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];
    jsonData.forEach(element => entries.push(element as Entry));

    return entries;
  }

  /**
   * Converts json data into a entry object
   * @param jsonData Json data
   */
  private jsonDataToEntry(jsonData: any): Entry {
    return jsonData as Entry;
  }

  /**
   * Handles request error
   * @param error Request error
   */
  private handleError(error: any): Observable<any> {
    console.error('Request error => ', error);
    return throwError(error);
  }
}
