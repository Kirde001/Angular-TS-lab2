import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';


class Item{
  FilmName: string;
  CinemaHall: string;
  Date: Date;
  City: string;
  Tel: string;

  constructor(FilmName: string, City: string, CinemaHall: string, Date:Date, Tel: string) {
      this.FilmName= FilmName;
      this.City = City;
      this.CinemaHall = CinemaHall;
      this.Date = Date;
      this.Tel = Tel;
  }
}


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class AppComponent {
  title: string = 'Лабораторная работа №2';

  constructor(public dialog: MatDialog) {}
  
  items: Item[] =[];
  addItem(FilmName: string, City: string, CinemaHall: string, Date: Date, Tel: string): void {
    this.items.push(new Item(FilmName, City, CinemaHall, Date, Tel));
}


deleteItem(item: Item) {
  const index = this.items.findIndex((existingItem) => existingItem === item);
  if (index > -1) {
    this.items.splice(index, 1);
  }
}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContent,
      {
      data: {},
  }
  );

  dialogRef.afterClosed().subscribe((result: Item) => {
    if (result) {
      this.addItem(result.FilmName, result.City,result.CinemaHall,result.Date,result.Tel);
    }
  });
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'app.component.dialog.html',
  standalone: true,
  imports: 
  [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDatepickerModule, MatSelectModule, MatCheckboxModule],
  providers: [provideNativeDateAdapter()],
})

export class DialogContent{
  isDisabled = true;

  checkFormValidity() {
    this.isDisabled = !(
      this.data.FilmName.trim() &&
      this.data.CinemaHall &&
      this.data.Date &&
      this.data.City.trim() &&
      this.data.Tel
    );
  }

  constructor(
    public dialogRef: MatDialogRef<DialogContent>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
  ) {}

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  onOkClick(): void {
    this.dialogRef.close(new Item(this.data.FilmName, this.data.City, this.data.CinemaHall,this.data.Date,this.data.Tel));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
