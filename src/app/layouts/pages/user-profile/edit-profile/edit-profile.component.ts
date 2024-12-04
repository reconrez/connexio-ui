import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {

  previewProfilePicture(event: Event) {
    const reader = new FileReader();
    reader.onload = function () {
      const profilePreview = document.getElementById("profilePreview") as HTMLImageElement;
      profilePreview.src = reader.result as string;
    };
    reader.readAsDataURL((event.target as HTMLInputElement).files![0]);
  }

}
