import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { Store } from '@ngrx/store';
import { setTagAction } from '../share/store/actions/tag.action';
import { setErrorAction } from '../share/store/actions/error.action';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css',
})
export class TagsComponent {
  tags: string[] = [];
  activeTag = '';
  constructor(private postsService: PostService, private store: Store) {

  }
  ngOnInit() {
    this.postsService.getTags().subscribe((data) => {
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
  getPostsByTag(tag: string) {
    this.activeTag = tag;
    this.store.dispatch(setTagAction({tag}))
  }
}
