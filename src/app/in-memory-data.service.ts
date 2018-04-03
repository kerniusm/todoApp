import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let todo = [
      { id: 1, name: 'Todo List Item 1', isMarkedAsDone: true, priority: 1 },
      { id: 2, name: 'Todo List Item 2', isMarkedAsDone: false, priority: 2 }
    ];
    return {todo};
  }
}
