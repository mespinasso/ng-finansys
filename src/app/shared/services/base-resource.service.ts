import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseResourceModel } from '../models/base-resource.model';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;

  protected constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData) => T) {

    this.http = injector.get(HttpClient);
  }

  // PUBLIC METHODS

  /**
   * Gets an array of all registered resources
   */
  getAll(): Observable<T[]> {
    return this.http.get(this.apiPath).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(BaseResourceService.handleError)
    )
  }

  /**
   * Gets a resource by ID
   * @param id Resource ID
   */
  getById(id: number): Observable<T> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(BaseResourceService.handleError)
    )
  }

  /**
   * Creates a new resource into the database
   * @param resource Resource
   */
  create(resource: T): Observable<T> {
    return this.http.post(this.apiPath, resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(BaseResourceService.handleError)
    )
  }

  /**
   * Updates an existing resource by ID
   * @param resource Resource
   */
  update(resource: T): Observable<T> {
    const url = `${this.apiPath}/${resource.id}`;

    return this.http.put(url, resource).pipe(
      map(() => resource),
      catchError(BaseResourceService.handleError)
    )
  }

  /**
   * Deletes resource from database
   * @param id Resource id
   */
  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      map(() => null),
      catchError(BaseResourceService.handleError)
    )
  }
  
  // PROTECTED METHODS

  /**
   * Converts json data into array of resources
   * @param jsonData Json data
   */
  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(element => resources.push(this.jsonDataToResourceFn(element)));

    return resources;
  }

  /**
   * Converts json data into a resource object
   * @param jsonData Json data
   */
  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  /**
   * Handles request error
   * @param error Request error
   */
  protected static handleError(error: any): Observable<any> {
    console.error('Request error => ', error);
    return throwError(error);
  }
}
