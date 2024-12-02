import {Component, inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Data, Router} from "@angular/router";

@Component({
  selector: 'app-product-edit-dialog',
  standalone: true,
  imports: [],
  templateUrl: './product-edit-dialog.component.html',
  styleUrl: './product-edit-dialog.component.scss'
})
export class ProductEditDialogComponent implements OnInit {

  dialogRef: MatDialogRef<any> | null = null;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) { }

  openDialog(data: Data): void {
    this.dialogRef = this.dialog.open(data["component"], {
      minWidth: '55vw',
      maxHeight: '90vh',
      data: {
        id: this.route.snapshot.params["id"],
      }
    });
    this.dialogRef.afterClosed().subscribe(_ => this.router.navigate(['/']));
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.openDialog(data);
      if (!this.route.snapshot.params["id"]) {
        this.dialogRef?.close();
      }
    });
  }
}
