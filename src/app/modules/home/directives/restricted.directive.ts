import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";
import {AuthService} from "../../../shared/services/auth.service";

@Directive({
  selector: '[showAuthed]'
})
export class RestrictedDirective implements OnInit {

  condition!: boolean

  constructor(
    private auth: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {
  }

  @Input() set showAuthed(condition: boolean) {
    this.condition = condition
  }

  ngOnInit() {
    this.auth.isAuth$.subscribe(
      (status) => {
        if(status && this.condition || !status && !this.condition) {
          this.viewContainer.createEmbeddedView(this.templateRef)
        } else {
          this.viewContainer.clear()
        }
      }
    )
  }

}
