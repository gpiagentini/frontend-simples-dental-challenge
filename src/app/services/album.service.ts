import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, forkJoin, map, Observable, of, retry, switchMap } from 'rxjs';
import { Album } from '../objects/Album';
import { Photo } from '../objects/Photo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private readonly albumsRoute: string = environment.albumsRequest;
  private readonly photosRoute: string = environment.photosRequest;

  constructor(private readonly http: HttpClient) {
  }

  /* 
    Getting all albums and their first photo.
  */
  public getAllAbums(): Observable<Album[]> {
    return this.getAlbums().pipe(
      switchMap(albums => {
        return forkJoin(albums.map(album => this.getAlbumFirstPhoto(album.id).pipe(
          map((photo: Photo) => {
            album.firstPhoto = photo;
            return album;
          })
        )));
      })
    );
  }

  /*
    Getting all photos from an album.
  */
  public getPhotosByAlbumId(albumId: number): Observable<Photo[]> {
    return this.getAlbumPhotos(albumId);
  }

  /*
    Getting an album by its id.
  */
  public getAlbumById(albumId: number): Observable<Album | null> {
    return this.http.get<Album>(this.albumsRoute + "/" + albumId).pipe(
      retry(3),
      catchError(() => {
        return of(null);
      })
    );
  }

  /* 
    Getting the first 10 photos from an album.
  */
  public getAlbumPhotos(albumId: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photosRoute + "?albumId=" + albumId)
      .pipe(
        retry(3),
        map(photos => {
          return photos.slice(0, 10).map(photo => this.replacePlaceholder(photo));
        })
      );
  }

  /*
    Getting the first photo from an album.
  */
  private getAlbumFirstPhoto(albumId: number): Observable<Photo> {
    return this.http.get<Photo[]>(this.photosRoute + "?albumId=" + albumId).pipe(
      retry(3),
      filter(photos => photos.length > 0),
      map(photos => {
        photos[0] = this.replacePlaceholder(photos[0]);
        return photos[0];
      })
    );
  }

  /*
    Getting all albums.
  */
  private getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsRoute).pipe(retry(3));
  }

  /*
    Replaces the placeholder url for one that is working.
    Replaces via.placeholder.com for placehold.co, keeping the original colors.
  */
  private replacePlaceholder(photo: Photo): Photo {
    const regex = /\/([0-9a-fA-F]{5,6})$/;
    const match = photo.url.match(regex);
    if (match) {
      const color = match[1];
      photo.url = photo.url.replace("via.placeholder.com", "placehold.co").replace(/\/([0-9a-fA-F]{5,6})$/, `/dddddd/${color}`);
      photo.thumbnailUrl = photo.thumbnailUrl.replace("via.placeholder.com", "placehold.co").replace(/\/([0-9a-fA-F]{5,6})$/, `/dddddd/${color}`);
    }
    return photo;
  }
}
