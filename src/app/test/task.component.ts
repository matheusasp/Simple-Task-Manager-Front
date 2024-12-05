import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { map, Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterByStatusPipe } from '../filter-by-status.pipe'; 
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, FilterByStatusPipe, DragDropModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {

  userInput: { value: string, status: boolean, check: string }[] = [];
  isModalOpen = false;
  tasks$: Observable<any[]>;
  taskToEdit: any = {};


  
  status: boolean = false;



  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.getData();
  }

  ngOnInit(): void {

  }

  getData(value: string, status: boolean): void {
      var check = 'Not done';

  }

  markTask(data: any, index: any): void {
    if(data === false) {

    } else {

    }
  }

  newTask(value: string): void {
    if (value.trim()) {
      const newTaskData = { task_name: value, status: 'To Do' };
      this.taskService.newTask(newTaskData).subscribe({
        next: (response) => {
          this.tasks$ = this.taskService.getData();
        },
        error: (error) => {
        }
      });
    }
  }

  changeTask(task: any): void {
    this.taskToEdit = { ...task }; 
    this.isModalOpen = true;  
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.taskToEdit = {};
  }

  saveTask(): void {
    if (this.taskToEdit.task_name.trim()) {
      this.taskService.changeTask(this.taskToEdit).subscribe({
        next: (updatedTask) => {
          this.tasks$ = this.tasks$.pipe(
            map((tasks) => {
              const updatedTasks = tasks.filter(t => t.id !== updatedTask.id);
              updatedTasks.push(updatedTask);
              return updatedTasks;
            })
          );
          this.isModalOpen = false; 
          this.taskToEdit = {}; 
        },
        error: (err) => {
        }
      });
    }
  }
  
  deleteTask(task: any): void {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks$ = this.tasks$.pipe(
          map((tasks) => tasks.filter(t => t.id !== task.id))
        );
      },
      error: (err) => {
      }
    });
  }

  onTaskDropped(event: CdkDragDrop<any[]>, newStatus: string): void {
    const task = event.item.data;
  
    if (task && task.status !== newStatus) {
      const previousStatus = task.status;
      task.status = newStatus;
  
      this.taskService.changeTask(task).subscribe({
        next: () => {
          this.tasks$ = this.tasks$.pipe(
            map((tasks) => {
              const updatedTasks = tasks.filter(t => t.id !== task.id);
              updatedTasks.push(task);
              return updatedTasks;
            })
          );
        },
        error: (error) => {
          task.status = previousStatus;
        },
      });
    } else {
    }
  }
  



}
