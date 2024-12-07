import { Component } from '@angular/core';

@Component({
    selector: 'app-forum',
    imports: [],
    templateUrl: './forum.component.html',
    styleUrl: './forum.component.scss'
})
export class ForumComponent {

  createThread = () => {
    document.querySelector('.create-thread-form').addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission
    
      const title = (document.getElementById('thread-title') as HTMLInputElement).value.trim();
      const description = (document.getElementById('thread-description') as HTMLInputElement).value.trim();    
      if (title && description) {
        // Log the thread data
        console.log('Thread Created:', { title, description });
    
        // Optionally, clear the form
        const threadTitle = document.getElementById('thread-title')
        const threadDescription = document.getElementById('thread-description')
    
        // Notify the user (replace with actual API or data handling logic)
        alert('Thread created successfully!');
      } else {
        alert('Please fill in all fields.');
      }
    });
    
  }
  

}
