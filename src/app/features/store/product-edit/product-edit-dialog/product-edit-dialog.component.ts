import {Component, inject, OnInit} from '@angular/core';
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

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) { }

  openDialog(data: Data): void {
    const dialogRef = this.dialog.open(data["component"], {
      minWidth: '90vw',
      data: {
        id: this.route.snapshot.params["id"]
      }
    });
    dialogRef.afterClosed().subscribe(_ => this.router.navigate(['/']));
  }

  ngOnInit() {
    console.log(this.route.data);
    console.log(this.route.snapshot.params);
    this.route.data.subscribe(data => this.openDialog(data));
  }
}
