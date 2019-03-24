import {InMemoryDbService} from 'angular-in-memory-web-api';

import {Category} from './pages/categories/shared/category.model';

export class InMemoryDatabase implements InMemoryDbService {

  createDb() {
    const categories: Category[] = [
      {id: 1, name: 'Utilities', description: 'Utilities bills'},
      {id: 2, name: 'Health', description: 'Health insurance and treatments'},
      {id: 3, name: 'Leisure', description: 'Movies, parks, theaters...'},
      {id: 4, name: 'Salary', description: 'Salary income'},
      {id: 5, name: 'Freelancer', description: 'Freelancer jobs income'}
    ];

    return {categories};
  }
}