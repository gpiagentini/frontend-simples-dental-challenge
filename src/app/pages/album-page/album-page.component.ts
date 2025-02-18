import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../../objects/Album';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { AlbumService } from '../../services/album.service';
import { Photo } from '../../objects/Photo';
import { NgFor, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GridColumnService } from '../../services/grid-column.service';
import { ThumbnailComponent } from "../../components/thumbnail/thumbnail.component";


@Component({
  selector: 'app-album-page',
  imports: [NgFor, NgIf, NavbarComponent, MatGridListModule, MatProgressBarModule, ThumbnailComponent],
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.scss'
})
export class AlbumPageComponent implements OnInit {

  albumId!: string;
  album: Album | null = null;
  photos: Photo[] = [];
  loadingPhotos: boolean = true;
  loadingAlbum: boolean = true;
  totalColumns: number = 0;

  constructor(private readonly route: ActivatedRoute, private readonly albumService: AlbumService, private readonly gridColumnService: GridColumnService) {
    this.totalColumns = this.gridColumnService.getColumnsBySize(window.innerWidth);
  }

  /* 
    - Gets the album id from the route.
    - Loads the album info and photos, based on the id.
  */
  ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('id') ?? '';
    if (history.state.album) {
      this.album = history.state.album;
      this.loadingAlbum = false;
    }
    else
      this.loadAlbumInfo(parseInt(this.albumId));
    this.albumService.getPhotosByAlbumId(parseInt(this.albumId)).subscribe(this.loadPhotos);
  }

  /*
    Handles the window resize event, to update the number of columns in the grid.
  */
  handleSize(event: any) {
    this.totalColumns = this.gridColumnService.getColumnsBySize(event.target.innerWidth);
  }

  private readonly loadPhotos = (photos: Photo[]) => {
    this.photos = photos;
    this.loadingPhotos = false;
  }

  private loadAlbumInfo(albumId: number) {
    this.albumService.getAlbumById(albumId)
      .subscribe(album => {
        this.album = album
        this.loadingAlbum = false
      })
  }

}
