import { Component } from "@angular/core";

@Component({
  selector: "no-content",
  template: `
    <div>
    <h1 class="error">Nothing to see here...</h1>
    </div>
  `,
  styles: [`
    .error {
      text-align: center;   
      color: white;
      position: relative;
      top: 200px;
    }
  `]
})
export class NoContentComponent {

}
