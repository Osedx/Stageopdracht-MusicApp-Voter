import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataService } from "../../services/data.service";
import { UserlistPageComponent } from "./userlistpage.component";
import { UserlistComponent } from "../../components/users/userlist/userlist.component";
import { UserComponent } from "../../components/users/user/user.component";
import { NgSemanticModule } from "ng-semantic";
import { UserListState} from "../../components/services/userlist-state.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PipesModule } from "../../pipes";

@NgModule({
    imports: [ CommonModule, NgSemanticModule, ReactiveFormsModule, FormsModule, PipesModule ],
    providers: [ DataService, UserListState ],
    declarations: [ UserlistPageComponent, UserlistComponent, UserComponent ],
    exports: [ UserlistPageComponent ]
})

export class UserlistPageModule { }