import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-thumbnail',
  imports: [MatCardModule, MatTooltipModule],
  templateUrl: './thumbnail.component.html',
  styleUrl: './thumbnail.component.scss'
})
export class ThumbnailComponent {
  @Input() public thumbnailUrl!: string;
  @Input() public photoTitle!: string;
  @Input() public albumTitle!: string;
}
