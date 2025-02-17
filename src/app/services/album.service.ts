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

  public getPhotosByAlbumId(albumId: number): Observable<Photo[]> {
    return this.getAlbumPhotos(albumId);
  }

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

  private getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsRoute).pipe(retry(3));
  }

  public getAlbumById(albumId: number): Observable<Album | null> {
    return this.http.get<Album>(this.albumsRoute + "/" + albumId).pipe(
      retry(3),
      catchError(() => {
        return of(null);
      })
    );
  }

  public getAlbumPhotos(albumId: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photosRoute + "?albumId=" + albumId)
      .pipe(
        retry(3),
        map(photos => {
          return photos.slice(0, 10).map(photo => this.replacePlaceholder(photo));
        })
      );
  }

  public getAlbumFirstPhoto(albumId: number): Observable<Photo> {
    return this.http.get<Photo[]>(this.photosRoute + "?albumId=" + albumId)
      .pipe(
        retry(3),
        filter(photos => photos.length > 0),
        map(photos => {
          photos[0] = this.replacePlaceholder(photos[0]);
          return photos[0];
        })
      );
  }
}
