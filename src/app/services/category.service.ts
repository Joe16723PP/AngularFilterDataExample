import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {CategoryModel} from "../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategoryList(): Observable<CategoryModel[]> {
    let url = 'https://api.publicapis.org/categories'
    return this.http.get<CategoryModel[]>(url).pipe(
      map((data: any[]) => {
        return  data.map((value, index) => {
          let category: CategoryModel = {id: index, displayName: value}
          return category
        })
      })
    )
  }
}
