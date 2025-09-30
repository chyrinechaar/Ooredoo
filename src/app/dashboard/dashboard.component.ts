// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  selectedNav: 'dashboard' | 'products' = 'dashboard';
  products: Product[] = [];
  cards: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Load products from backend
  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.updateCards();
      },
      error: (err) => console.error('Error loading products', err),
    });
  }

  // Build summary cards per category
  updateCards(): void {
    const categories = ['Internet Package', 'Smartphone', 'Connected Object', 'IoT Gateway'];

    this.cards = categories.map((category) => {
      const group = this.products.filter((p) => p.category === category);
      return {
        title: category,
        key: category,
        totalSales: group.reduce((sum, p) => sum + (p.salesCount ?? 0), 0),
        bestSeller: this.findBestSeller(group),
      };
    });
  }

  findBestSeller(data: Product[]): string {
    if (!data || data.length === 0) return 'N/A';
    const best = [...data].sort((a, b) => (b.salesCount ?? 0) - (a.salesCount ?? 0))[0];
    return best?.name ?? 'Unknown';
  }
}
