import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';


import { Album } from '../../objects/Album';
import { NgFor, NgIf } from '@angular/common';
import { AlbumService } from '../../services/album.service';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { GridColumnService } from '../../services/grid-column.service';
import { ThumbnailComponent } from "../../components/thumbnail/thumbnail.component";

@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, MatProgressBarModule, MatGridListModule, MatTooltipModule, NavbarComponent, ThumbnailComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public loading: boolean = true;
  public albums: Album[] = [];
  public totalColumns: number = 0;

  constructor(private readonly albumService: AlbumService, private readonly router: Router,
    private readonly gridColumnService: GridColumnService) {
    this.totalColumns = this.gridColumnService.getColumnsBySize(window.innerWidth);
  }

  /*
    Loads all albums from the album service.
  */
  ngOnInit() {
    this.albumService.getAllAbums().subscribe(this.loadAlbums);
  }

  goToAlbumSpecificPage(album: Album) {
    this.router.navigate(["/albums", album.id], { state: { album } });
  }

  /*
    Handles the window resize event, to update the number of columns in the grid
  */
  handleSize(event: any) {
    this.totalColumns = this.gridColumnService.getColumnsBySize(event.target.innerWidth);
  }

  private readonly loadAlbums = (albums: Album[]) => {
    this.albums = albums;
    this.loading = false;
  }

}
