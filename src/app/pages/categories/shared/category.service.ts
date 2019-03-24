import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath: string = "api/categories";

  constructor(private http: HttpClient) { }

  // PUBLIC METHODS

  /**
   * Gets an array of all registered categories
   */
  getAll(): Observable<Category[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    )
  }

  /**
   * Gets a category by ID
   * @param id Category ID
   */
  getById(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  /**
   * Creates a new category into the database
   * @param category Category
   */
  create(category: Category): Observable<Category> {
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  /**
   * Updates an existing category by ID
   * @param category Category
   */
  update(category: Category): Observable<Category> {
    const url = `${this.apiPath}/${category.id}`;

    return this.http.put(url, category).pipe(
      catchError(this.handleError),
      map(() => category)
    )
  }

  /**
   * Deletes category from database
   * @param id Category id
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
   * Converts json data into array of categories
   * @param jsonData Json data
   */
  private jsonDataToCategories(jsonData: any[]): Category[] {
    const categories: Category[] = [];
    jsonData.forEach(element => categories.push(element as Category));

    return categories;
  }

  /**
   * Converts json data into a category object
   * @param jsonData Json data
   */
  private jsonDataToCategory(jsonData: any): Category {
    return jsonData as Category;
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
