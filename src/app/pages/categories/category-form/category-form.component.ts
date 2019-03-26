import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

import {switchMap } from 'rxjs/operators';

import toastr from 'toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  /**
   * Form submission event
   */
  submitForm() {
    this.submittingForm = true;

    if (this.currentAction == 'new') {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }

  // PRIVATE METHODS

  /**
   * Sets current action [NEW/EDIT]
   */
  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'new')
      this.currentAction = 'new';
    else
      this.currentAction = 'edit';
  }

  /**
   * Sets category form
   */
  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  /**
   * Loads category if editing
   */
  private loadCategory() {
    if (this.currentAction == 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get('id')))
      )
        .subscribe(
          (category) => {
            this.category = category;
            this.categoryForm.patchValue(this.category);
          },
          () => alert('An error occurred while fetching the category')
        )
    }
  }

  /**
   * Sets the page title
   */
  private setPageTitle() {
    if (this.currentAction == 'new') {
      this.pageTitle = 'New Category';
    } else {
      const categoryName = this.category.name || '';
      this.pageTitle = `Editing Category: ${categoryName}`;
    }
  }

  /**
   * Creates category with form data
   */
  private createCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.create(category)
      .subscribe(
        category => this.actionsForSuccess(category),
        error => this.actionsForError(error)
      )
  }

  /**
   * Updates category with form data
   */
  private updateCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.update(category)
      .subscribe(
        category => this.actionsForSuccess(category),
        error => this.actionsForError(error)
      )
  }

  /**
   * Shows success message and reloads form
   * @param category Category
   */
  private actionsForSuccess(category: Category) {
    toastr.success('Successfully processed!');

    this.router.navigateByUrl("categories", {skipLocationChange: true}).then(
      () => this.router.navigate(['categories', category.id, 'edit'])
    )
  }

  /**
   * Shoes error message
   * @param error Error
   */
  private actionsForError(error) {
    toastr.error('An error occurred!');
    console.error(error);

    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Server error'];
    }
  }
}
