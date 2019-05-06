import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {

  constructor(
    protected categoryService: CategoryService,
    protected injector: Injector) {

    super(injector, new Category(), categoryService, Category.fromJson);
  }

  // PRIVATE METHODS

  /**
   * Sets category form
   */
  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  /**
   * Creation page title
   */
  protected creationPageTitle() : string {
    return 'New Category';
  }

  /**
   * Edition page title
   */
  protected editionPageTitle() : string {
    const categoryName = this.resource.name || '';
    return 'Editing Category: ' + categoryName;
  }
}
