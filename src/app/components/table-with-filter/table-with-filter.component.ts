import {Component, OnInit} from '@angular/core';
import {CategoryModel} from "../../models/category.model";
import {MatTableDataSource} from "@angular/material/table";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-table-with-filter',
  templateUrl: './table-with-filter.component.html',
  styleUrls: ['./table-with-filter.component.css']
})
export class TableWithFilterComponent implements OnInit {
  displayedColumns = ["category"]
  dataSource = new MatTableDataSource<CategoryModel>([]);
  original: CategoryModel[] = []

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategoryList().subscribe(categories => {
      this.dataSource.data = categories
      this.original = categories
    })

  }

  onFilterCategory(search: HTMLInputElement) {
    let searchValue = search.value.trim().toLowerCase();
    // using build-in function
    // this.dataSource.filter = search.value.trim().toLowerCase();

    // using normal way
    this.dataSource.data = this.original.filter(value => {
      return value.displayName.toLowerCase().search(searchValue) !== -1;
    })
  }
}
