import {InMemoryDbService} from 'angular-in-memory-web-api';

import {Category} from './pages/categories/shared/category.model';
import {Entry} from './pages/entries/shared/entry.model';

export class InMemoryDatabase implements InMemoryDbService {

  createDb() {
    const categories: Category[] = [
      {id: 1, name: 'Utilities', description: 'Utilities bills'},
      {id: 2, name: 'Health', description: 'Health insurance and treatments'},
      {id: 3, name: 'Leisure', description: 'Movies, parks, theaters...'},
      {id: 4, name: 'Salary', description: 'Salary income'},
      {id: 5, name: 'Freelancer', description: 'Freelancer jobs income'}
    ];

    const entries: Entry[] = [
      {
        id: 1,
        name: 'Movies',
        categoryId: categories[3].id,
        category: categories[3],
        paid: true,
        date: '29/03/2019',
        amount: '30,00',
        type: 'expense',
        description: 'Movie rental for movies night'
      } as Entry,
      {
        id: 2,
        name: 'Pizza',
        categoryId: categories[3].id,
        category: categories[3],
        paid: true,
        date: '29/03/2019',
        amount: '45,00',
        type: 'expense',
        description: 'Pizza for movies night'
      } as Entry,
      {
        id: 5,
        name: 'WebApp XYZ Project',
        categoryId: categories[4].id,
        category: categories[4],
        paid: true,
        date: '30/03/2019',
        amount: '5000,00',
        type: 'revenue',
        description: 'Freelancer project'
      } as Entry

    ];

    return {categories, entries};
  }
}
