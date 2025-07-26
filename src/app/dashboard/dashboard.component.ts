import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartData } from 'chart.js';
import {  ChartOptions } from 'chart.js';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';




 

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [ CommonModule, FormsModule, RouterModule, NgChartsModule, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent {
  selectedTab: 'summary' | 'details' = 'summary';
  selectedCategory: string | null = null;



  cards = [
    { title: 'Cars', key: 'cars', color: 'primary' },
    { title: 'Phones', key: 'phones', color: 'success' },
    { title: 'Connected Objects', key: 'connectedObjects', color: 'warning' },
    { title: 'Gateways', key: 'gateways', color: 'danger' }
  ];
  
  
  

  // Chart type selector
  chartTypes = [
    { label: 'Pie', value: 'pie' as ChartType, icon: 'bi bi-pie-chart' },
    { label: 'Bar', value: 'bar' as ChartType, icon: 'bi-bar-chart-fill' },
    { label: 'Doughnut', value: 'doughnut' as ChartType, icon: 'bi bi-record-circle-fill' }
  ];
  selectedChartType: ChartType = 'pie';

  // Chart Labels and Data
  pieChartLabels: string[] = [];

  pieChartData: ChartData<ChartType, number[], string> = {
    labels: [],
    datasets: [{ data: [] }]
  };

  pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  // Sample data categories
  carsData = [
    { model: 'Toyota', Sales: 120 },
    { model: 'BMW', Sales: 80 },
  ];
  phonesData = [
    { model: 'iPhone', Sales: 300 },
    { model: 'Samsung', Sales: 180 },
  ];
  connectedObjectsData = [
    { model: 'SmartWatch', Sales: 60 },
    { model: 'Smart Light', Sales: 100 },
  ];
  gatewaysData = [
    { model: 'Gateway A', Sales: 120 },
    { model: 'Gateway B', Sales: 80 },
  ];

  // Tab and chart controls
  selectTab(tab: 'summary' | 'details') {
    this.selectedTab = tab;
  }

  handleCardAction(cardNumber: number) {
    const card = this.cards[cardNumber - 1];
    if (card) {
      this.selectedCategory = card.key;
      this.selectTab('summary');
      this.updateChartData();
    }
  }
  
  get currentData() {
    switch (this.selectedCategory) {
      case 'cars':
        return this.carsData;
      case 'phones':
        return this.phonesData;
      case 'connectedObjects':
        return this.connectedObjectsData;
      case 'gateways':
        return this.gatewaysData;
      default:
        return [];
    }
  }

  updateChartData() {
    const data = this.currentData;
    this.pieChartLabels = data.map(d => d.model);
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [{
        data: data.map(d => d.Sales),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }]
    };
  }

  // Handle chart type change
  onChartTypeChange(type: ChartType) {
    this.selectedChartType = type;
  }

  // Add this method to your DashboardComponent class
  getIconClass(chartType: ChartType): string {
    switch (chartType) {
      case 'pie':
        return 'bi-pie-chart-fill';
      case 'bar':
        return 'bi-bar-chart-fill';
      case 'doughnut':
        return 'bi bi-coin'; // Example of a different icon for doughnut
      default:
        return 'bi-graph-up'; // Default icon
    }
}

downloadExcel(): void {
  const dataToExport = this.currentData;

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook: XLSX.WorkBook = {
    Sheets: { data: worksheet },
    SheetNames: ['data']
  };

  const excelBuffer: any = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });

  const blob: Blob = new Blob([excelBuffer], {
    type:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  });

  const fileName = `${this.selectedCategory}_details.xlsx`;
  saveAs(blob, fileName);
}

}
  



