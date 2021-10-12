import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";
import {AuthService} from "../../../store/auth/auth.service";
import {AuthQuery} from "../../../store/auth/auth.query";

@Directive({
  selector: '[showAuthed]'
})
export class RestrictedDirective implements OnInit {

  condition!: boolean

  constructor(
    private authQuery: AuthQuery,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {
  }

  @Input() set showAuthed(condition: boolean) {
    this.condition = condition
  }

  ngOnInit() {
    this.authQuery.isAuth$.subscribe(
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
