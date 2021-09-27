import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bb-first',
  template: `
    <p>
      first works!
    </p>
  `,
  styles: [
  ]
})
export class FirstComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
