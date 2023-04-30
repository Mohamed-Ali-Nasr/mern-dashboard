import { Request, Response } from "express";
import User from "../models/User";
import Transaction from "../models/Transaction";
import OverallStat from "../models/OverallStat";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /* Recent Transactions */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      dailyData,
    } = overallStat[0];

    const thisMonthStats = monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
