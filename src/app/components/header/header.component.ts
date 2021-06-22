import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from "src/app/services/usuarios.service";


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

	constructor(public authService: AuthService, private router: Router, public usuariosServicio: UsuariosService) { }

	rxTime = new Date();
	intervalId: number = 0;
	subscription: Subscription = new Subscription();

	logout() {
		this.authService.logout();
		this.router.navigate(['/']);
	}

	ngOnInit(): void {
		this.subscription = timer(0, 1000)
			.pipe(
				map(() => new Date()),
				share()
			)
			.subscribe(time => {
				this.rxTime = time;
			});
	}

	ngOnDestroy() {
		clearInterval(this.intervalId);
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

}
