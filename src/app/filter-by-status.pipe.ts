import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByStatus',
  standalone: true
})
export class FilterByStatusPipe implements PipeTransform {
  transform(tasks: any[], status: string): any[] {
    if (!tasks || !status) {
      return tasks;
    }
    return tasks.filter(task => task.status === status);
  }
}
