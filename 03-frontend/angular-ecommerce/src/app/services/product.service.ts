import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient ) {}

  getProduct(productId: number): Observable<Product> {
    
    // build url based on product id
    const searchUrl: string = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(searchUrl);
  }

  getProductList(theCategoryId: number ): Observable<Product[]> {

    // build URL based on category id  
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  getProductListPaginate(thePage:number,
                          thePageSize: number,
                          theCategoryId: number ): Observable<GetResponseProducts> {

    // build URL based on category id , page number and page size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                        + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    
    // build url based on keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;   

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage:number,
                        thePageSize: number,
                        theKeyword: string ): Observable<GetResponseProducts> {

  // build URL based on keyword, page number and page size
  const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                  + `&page=${thePage}&size=${thePageSize}`;

  return this.httpClient.get<GetResponseProducts>(searchUrl);
}

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {

    const categoryUrl = 'http://localhost:8080/api/product-category';   

    return this.httpClient.get<GetResponseProductCategory>(categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

interface GetResponseProducts{
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}
