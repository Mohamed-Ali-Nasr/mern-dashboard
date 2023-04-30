export interface Tokens {
  grey: {
    0: string;
    10: string;
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    1000: string;
  };
  primary: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
}

export interface Theme {
  palette: {
    mode: string;
    primary: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      main: string;
      light: string;
    };
    secondary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      main: string;
      light?: string;
    };
    neutral: {
      0: string;
      10: string;
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      1000: string;
      main: string;
    };
    background: {
      default: string;
      alt: string;
    };
  };

  typography: {
    fontFamily: string;
    fontSize: number;
    h1: {
      fontFamily: string;
      fontSize: number;
    };
    h2: {
      fontFamily: string;
      fontSize: number;
    };
    h3: {
      fontFamily: string;
      fontSize: number;
    };
    h4: {
      fontFamily: string;
      fontSize: number;
    };
    h5: {
      fontFamily: string;
      fontSize: number;
    };
    h6: {
      fontFamily: string;
      fontSize: number;
    };
  };
}

export interface RootState {
  theme: {
    mode: string;
    userId: string;
  };
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  password: string;
  city: string;
  state: string | null;
  country: string;
  occupation: string;
  phoneNumber: string;
  transactions: string[];
  role: string;
}

export interface ProductsData {
  _id: string;
  category: string;
  createdAt: string;
  description: string;
  name: string;
  price: number;
  rating: number;
  supply: number;
  updatedAt: string;
  __v: number;
}

export interface ProductStatData {
  _id: string;
  createdAt: string;
  dailyData: {
    _id: string;
    date: string;
    totalSales: number;
    totalUnits: number;
  }[];
  monthlyData: {
    _id: string;
    month: string;
    totalSales: number;
    totalUnits: number;
  }[];
  productId: string;
  updatedAt: string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  __v: number;
}

export interface AllProductsData {
  product: ProductsData;
  stat: ProductStatData[];
}

export interface MonthData {
  _id: string;
  month: string;
  totalSales: number;
  totalUnits: number;
}

export interface DayData {
  _id: string;
  date: string;
  totalSales: number;
  totalUnits: number;
}
