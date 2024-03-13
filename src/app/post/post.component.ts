import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  id = '';
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit():void {
    this.id = this.route.snapshot.params['id'] || '';
  }
}
