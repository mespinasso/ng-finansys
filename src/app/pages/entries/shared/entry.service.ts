import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { BaseResourceService } from '../../../shared/services/base-resource.service';

import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(
    protected injector: Injector,
    private categoryService: CategoryService) {

    super("api/entries", injector, Entry.fromJson);
  }

  // PUBLIC METHODS

  /**
   * Creates a new entry into the database
   * @param entry Entry
   */
  create(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return super.create(entry);
      })
    );
  }

  /**
   * Updates an existing entry by ID
   * @param entry Entry
   */
  update(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return super.update(entry);
      })
    );
  }
}
