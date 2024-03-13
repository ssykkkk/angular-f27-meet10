import { Component } from '@angular/core';
import { IPost } from '../share/post.interface';
import { PostService } from '../services/post.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { setErrorAction } from '../share/store/actions/error.action';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  startLoaderAction,
  stopLoaderAction,
} from '../share/store/actions/loader.action';
import { Observable, of } from 'rxjs';
import { clearTagAction } from '../share/store/actions/tag.action';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  //Pagination
  //length = 50;
  offset = 0;
  pageSize = 9;
  pageSizeOptions = [9, 18, 27];

  posts: IPost[] = [];
  total: number = 0;
  isAuth: boolean = false;
  id = 0;
  isFilter = false;
  tag: Observable<string> = of('');

  selectedAuthorId: number | null = null;
  selectedTag: string | null = null;

  slug: string = '';
  isSuccess: boolean | string = false;
  changePostForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    tagList: new FormControl(''),
  });

  isOpenModal = false;
  constructor(
    private postService: PostService,
    private store: Store<{ auth: { token: string; id: number }; tag: string }>,
    private router: Router
  ) {
    this.tag = this.store.select((state) => state.tag);
    this.cancelFilters();

    this.store
      .select((state) => state.auth)
      .subscribe(({ token, id }) => {
        this.isAuth = token !== '';
        this.id = id || 0;
      });
  }

  createPost() {
    this.router.navigate(['/create-post']);
  }

  getAuthorPosts() {
    this.store.dispatch(startLoaderAction());
    if (this.selectedTag !== null) {
      const filteredPosts = this.posts.filter(post => post.author.id === this.id);
      this.posts = filteredPosts;
      this.total = filteredPosts.length;
      this.store.dispatch(stopLoaderAction());
    } else {
      this.postService
        .getPostsByAuthor(this.id, this.pageSize, this.offset)
        .subscribe((data) => {
          this.store.dispatch(stopLoaderAction());
          if ('articles' in data) {
            this.posts = data.articles;
            this.total = data.articlesCount;
            this.selectedAuthorId = this.id;
            this.selectedTag = null;
          } else {
            this.store.dispatch(
              setErrorAction({
                message: data.message || '',
                messages: data?.errors?.body || [],
              })
            );
  
            setTimeout(() => {
              this.store.dispatch(
                setErrorAction({
                  message: '',
                  messages: [],
                })
              );
            }, 5000);
          }
        });
    }
    this.isFilter = true;
  }

  clearFilters() {
    this.store.dispatch(clearTagAction());
    this.cancelFilters();
  }
  cancelFilters() {
    this.store.dispatch(startLoaderAction());

    this.tag.subscribe((value) => {
      if (value === '') {
        this.getData();
      } else {
        this.getPostsByTag(value);
      }
    });
    this.isFilter = false;
    this.selectedTag = null;
  }

  getPostsByTag(tag: string) {
    if (this.selectedAuthorId !== null) {
      const filteredPosts = this.posts.filter(post => post.tagList.includes(tag));
      this.posts = filteredPosts;
      this.total = filteredPosts.length;
      this.selectedTag = tag;
    } else {
      this.store.dispatch(startLoaderAction());
      this.postService.getPostsByTag(tag, this.pageSize, this.offset).subscribe((data) => {
        this.store.dispatch(stopLoaderAction());
        if ('articles' in data) {
          this.posts = data.articles;
          this.total = data.articlesCount;
          this.selectedTag = tag;
        } else {
          this.store.dispatch(
            setErrorAction({
              message: data.message || '',
              messages: data?.errors?.body || [],
            })
          );

          setTimeout(() => {
            this.store.dispatch(
              setErrorAction({
                message: '',
                messages: [],
              })
            );
          }, 5000);
        }
      });
    }
    this.isFilter = true;
  }
  setSlug(item: IPost) {
    this.slug = item.slug;

    const { title, body, description, tagList } = item;
    this.changePostForm.setValue({
      title,
      body,
      description,
      tagList: tagList.join(','),
    });

    this.isOpenModal = true;
    // this.document.body.style.overflow = 'hidden';
    // this.document.body.scrollTop = 0;
  }

  closeModal() {
    this.isOpenModal = false;
    //this.document.body.style.overflow = 'auto';
  }
  changePostFunc() {
    if (this.changePostForm.status === 'VALID') {
      const tagList = this.changePostForm.value.tagList
        .replaceAll(' ', '')
        .split(',');
      this.postService
        .changePost({ ...this.changePostForm.value, tagList }, this.slug)
        .subscribe((data) => {
          if ('article' in data) {
            this.isSuccess = 'Post changed successfully';
            this.cancelFilters();
          } else {
            this.store.dispatch(
              setErrorAction({
                message: data.message || '',
                messages: data?.errors?.body || [],
              })
            );
          }
        });
    } else {
      this.store.dispatch(
        setErrorAction({
          message: "Заповніть обов'язкові поля",
          messages: [],
        })
      );
    }

    setTimeout(() => {
      this.isSuccess = false;
      this.store.dispatch(
        setErrorAction({
          message: '',
          messages: [],
        })
      );
    }, 5000);
  }

  deletePost(slug: string) {
    this.store.dispatch(startLoaderAction());
    this.postService.deletePost(slug).subscribe((data) => {
      this.store.dispatch(stopLoaderAction());
      if ('affected' in data) {
        this.isSuccess = 'Post changed successfully';
        this.cancelFilters();
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

  handlePageEvent(e: PageEvent) {
    console.log(e.pageIndex, e.pageSize, e.length);
    const pageIndex = e.pageIndex;
    this.offset = pageIndex * e.pageSize;
    this.getData();
  }

  getData() {
    this.postService.getPosts(this.pageSize, this.offset).subscribe((data) => {
      this.store.dispatch(stopLoaderAction());
      if ('articles' in data) {
        this.posts = data.articles;
        this.total = data.articlesCount;
      } else {
        this.store.dispatch(
          setErrorAction({
            message: data.message || '',
            messages: data?.errors?.body || [],
          })
        );

        setTimeout(() => {
          this.store.dispatch(
            setErrorAction({
              message: '',
              messages: [],
            })
          );
        }, 5000);
      }
    });
  }
}
