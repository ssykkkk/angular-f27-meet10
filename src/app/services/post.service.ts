import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { IDeletePostResponse, IPostData, IPostResponse, IPosts } from '../share/post.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL } from '../share/backend';
import { IError } from '../share/interfaces/error.interface';
import { Store } from '@ngrx/store';
import { setErrorAction } from '../share/store/actions/error.action';
interface ITags{
  tags: string[];
}
@Injectable({
  providedIn: 'root',
})
export class PostService {
  public posts: IPosts = { articles: [], articlesCount: 0 };
  public tags: string[] = [];
  constructor(private http: HttpClient, private store: Store) {
    this.getPosts(9, 0).subscribe((data) => {
      if ('articles' in data) {
        this.posts = data;
      } else {
        this.store.dispatch(
          setErrorAction({
            message: data.message || '',
            messages: data?.errors?.body || [],
          })
        );
      }
    });

    this.getTags().subscribe((data) => {
      if ('tags' in data) {
        this.tags = data.tags;
      } else {
        this.store.dispatch(
          setErrorAction({
            message: data.message || '',
            messages: data?.errors?.body || [],
          })
        );
      }
    });
  }
  getPosts(limit: number, offset: number): Observable<IPosts | IError> {
    const url = URL + `/articles/?limit=${limit}&offset=${offset}`;
    return this.http.get<IPosts>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error as IError);
      })
    );
  }

  getTags(): Observable<ITags | IError> {
    const url = URL + '/tags';
    return this.http.get<ITags>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error as IError);
      })
    );
  }

  getPostsByAuthor(
    id: number,
    limit: number,
    offset: number
  ): Observable<IPosts | IError> {
    const url =
      URL + `/articles/?authorId=${id}&limit=${limit}&offset=${offset}`;
    return this.http.get<IPosts>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error as IError);
      })
    );
  }

  getPostsByTag(tag: string, limit: number, offset: number): Observable<IPosts | IError> {
    const url = URL + `/articles/?tag=${tag}&limit=${limit}&offset=${offset}`;
    return this.http.get<IPosts>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error as IError);
      })
    );
  }
  createPost(body: IPostData): Observable<IPostResponse | IError> {
    const url = URL + '/articles';
    return this.http
      .post<IPostResponse>(
        url,
        { article: { ...body } },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${localStorage.getItem('token')}`,
          },
        }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error.error as IError);
        })
      );
  }

  changePost(
    body: IPostData,
    slug: string
  ): Observable<IPostResponse | IError> {
    const url = URL + '/articles/' + slug;
    return this.http
      .put<IPostResponse>(
        url,
        { article: { ...body } },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${localStorage.getItem('token')}`,
          },
        }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error.error as IError);
        })
      );
  }

  deletePost(slug: string): Observable<IDeletePostResponse | IError> {
    const url = URL + '/articles/' + slug;
    return this.http
      .delete<IDeletePostResponse>(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error.error as IError);
        })
      );
  }
}
