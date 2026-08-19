export interface AnalyticsStats {
  earnings: {
    value: number;
    trend: number;
    isUp: boolean;
  };
  downloads: {
    value: number;
    trend: number;
    isUp: boolean;
  };
  saved: {
    value: number;
    trend: number;
    isUp: boolean;
  };
  confidence: {
    value: number;
    trend: number;
    isUp: boolean;
  };
}

export interface GetAnalyticsStatsResponse {
  success: boolean;
  data: AnalyticsStats;
}

export interface PerformanceChartData {
  name: string; // Date/Time label
  earnings: number;
  downloads: number;
  saved: number;
}

export interface GetPerformanceResponse {
  success: boolean;
  data: PerformanceChartData[];
}

export interface ProductPerformance {
  id: string;
  type: 'resource' | 'pathway';
  name: string;
  description: string;
  price: string | number;
  earnings: string | number;
  downloads: string | number;
  saves: string | number;
  views: string | number;
  confidence: number;
  isUp: boolean;
}

export interface GetProductsPerformanceResponse {
  success: boolean;
  data: {
    products: ProductPerformance[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}
