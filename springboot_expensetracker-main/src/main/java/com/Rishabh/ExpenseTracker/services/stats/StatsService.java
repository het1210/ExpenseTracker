package com.Rishabh.ExpenseTracker.services.stats;

import com.Rishabh.ExpenseTracker.dto.GraphDTO;
import com.Rishabh.ExpenseTracker.dto.StatsDTO;

public interface StatsService {

    GraphDTO getChartData();

    StatsDTO getStats();
}
