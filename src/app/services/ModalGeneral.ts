import { Location } from "@angular/common";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ModalInfoComponent } from "../components/modals/modal-info/modal-info.component";
import IModalData from "../interfaces/IModalData";

export default class ModalGeneral {

	constructor(private dialog: MatDialog, private location: Location, private router?: Router | null) { }

	openLoading() {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.data = <IModalData>{
			spinner: true,
		};
		this.dialog.open(ModalInfoComponent, dialogConfig);
	}

	openModalInfo(modalInfo: IModalData) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = modalInfo;
		this.dialog.closeAll();
		const dialogRef = this.dialog.open(ModalInfoComponent, dialogConfig);
		dialogRef.afterClosed().subscribe(data => {
			this.router ? this.router.navigate(["/login"]) : this.location.back()
		});
	}
}