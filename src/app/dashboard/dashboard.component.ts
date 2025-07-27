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




  findBestSeller(productData: any[]) {
    if (!productData || productData.length === 0) {
      return null; // ou retourner une valeur par défaut comme 'N/A'
    }
  
    let bestSeller = productData[0];
    
    for (const item of productData) {
      if (item.sales > bestSeller.sales) {
        bestSeller = item;
      }
    }
  
    return bestSeller.name || bestSeller.model || 'N/A';
  }
  
  
  

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

  internetPackagesData = [
    { name:'Pack Small 4G', model: 'Pack Small', dataVolume: '45 Go', price: 27, currency: 'TND', commitment: '24 Mois', professionalServices: '@IP', speedLimit: '2 Mbps', advantages: 'Premier mois d’activation proraté gratuit + Report Forfait pour le mois prochain', voice: '1 H', sales: 300 },
    { name:'Pack Mid 4G', model: 'Pack Mid', dataVolume: '75 Go', price: 45, currency: 'TND', commitment: '24 Mois', professionalServices: '@IP', speedLimit: '2 Mbps', advantages: 'Premier mois d’activation proraté gratuit + Report Forfait pour le mois prochain', voice: '1 H', sales: 30 },
    { name:'Pack High 4G', model: 'Pack High', dataVolume: '100 Go', price: 60, currency: 'TND', commitment: '24 Mois', professionalServices: '@IP', speedLimit: '2 Mbps', advantages: 'Premier mois d’activation proraté gratuit + Report Forfait pour le mois prochain', voice: '2 H', sales: 299 }
  ];

  incrementSales(){
    this.internetPackagesData[2].sales++;
    this.cards[0].bestSeller = this.findBestSeller(this.internetPackagesData);
    this.cards[0].totalSales = this.internetPackagesData.reduce((sum, item) => sum + item.sales, 0);
  }

  phonesData = [
    { brand: 'Apple', model: 'iPhone 14', os: 'iOS', storage: '128GB', ram: '6GB', price: 1799, currency: 'DT', sales: 300, availability: 'Available' },
    { brand: 'Samsung', model: 'Galaxy S23', os: 'Android', storage: '256GB', ram: '8GB', price: 1899, currency: 'DT', sales: 250, availability: 'Out of Stock' },
    { brand: 'Xiaomi', model: 'Redmi Note 12', os: 'Android', storage: '128GB', ram: '4GB', price: 999, currency: 'DT', sales: 600, availability: 'Available' }
  ];
  connectedObjectsData = [
    { name: 'Nest Cam', category: 'Camera', brand: 'Google', connectivity: 'Wi-Fi', batteryLife: 'Wired', price: 129, currency: 'DT', sales: 150, compatibility: 'Android/iOS' },
    { name: 'Echo Dot', category: 'Smart Speaker', brand: 'Amazon', connectivity: 'Wi-Fi', batteryLife: 'Plug-in', price: 49, currency: 'DT', sales: 400, compatibility: 'Alexa' },
    { name: 'Fitbit Charge 5', category: 'Smartwatch', brand: 'Fitbit', connectivity: 'Bluetooth', batteryLife: '7 days', price: 149, currency: 'DT', sales: 220, compatibility: 'Android/iOS' }
  ];
  gatewaysData = [
    { name: 'GW-1000X', type: 'Wi-Fi', protocols: 'MQTT/HTTP', maxDevices: 50, location: 'Warehouse A', status: 'Online', firmware: 'v1.2.3', sales: 20 },
    { name: 'IoT-Hub 5G', type: 'Cellular', protocols: 'MQTT/CoAP', maxDevices: 100, location: 'Factory B', status: 'Offline', firmware: 'v2.0.1', sales: 15 },
    { name: 'EdgeBridge', type: 'Ethernet', protocols: 'HTTP/MQTT', maxDevices: 25, location: 'Office 1', status: 'Online', firmware: 'v1.0.9', sales: 10 }
  ];

  cards = [
    { title: 'internetPackages', key: 'internetPackages', totalSales: 333, bestSeller: this.findBestSeller(this.internetPackagesData) , color: 'primary' },
    { title: 'Phones', key: 'phones', color: 'success', totalSales: 1149, bestSeller: this.findBestSeller(this.phonesData)},
    { title: 'Connected Objects', key: 'connectedObjects',totalSales: 770, bestSeller: this.findBestSeller(this.connectedObjectsData), color: 'warning' },
    { title: 'Gateways', key: 'gateways', totalSales: 45,  bestSeller: this.findBestSeller(this.gatewaysData), color: 'danger' }
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
  
  get currentData(): any[] {
    switch (this.selectedCategory) {
      case 'internetPackages':
        return this.internetPackagesData;
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
    const labelField = this.selectedCategory === 'phones' ? 'model' : 'name';
  
    const hasSales = data.some(d => 'sales' in d || 'Sales' in d);
    if (!hasSales) {
      this.pieChartData = { labels: [], datasets: [{ data: [] }] };
      this.pieChartLabels = [];
      return;
    }
  
    const salesField = 'sales';
    this.pieChartLabels = data.map(d => (d as any)[labelField] || 'Unknown');
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [{
        data: data.map(d => (d as any)[salesField] ?? 0),
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
  



