import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ChartData {
  period: string;
  verifications: number;
  flags: number;
}

const chartData: ChartData[] = [
  { period: 'Jan', verifications: 1200, flags: 45 },
  { period: 'Feb', verifications: 1450, flags: 38 },
  { period: 'Mar', verifications: 1680, flags: 52 },
  { period: 'Apr', verifications: 1520, flags: 41 },
  { period: 'May', verifications: 1890, flags: 28 },
  { period: 'Jun', verifications: 2100, flags: 33 },
];

export function VerificationChart() {
  const maxVerifications = Math.max(...chartData.map(d => d.verifications));
  const maxFlags = Math.max(...chartData.map(d => d.flags));
  const currentMonth = chartData[chartData.length - 1];
  const previousMonth = chartData[chartData.length - 2];
  
  const verificationTrend = ((currentMonth.verifications - previousMonth.verifications) / previousMonth.verifications * 100);
  const flagTrend = ((currentMonth.flags - previousMonth.flags) / previousMonth.flags * 100);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Verification Trends</h3>
          <p className="text-sm text-gray-600">Monthly verification and flag statistics</p>
        </div>
        <div className="flex space-x-4">
          <div className="text-right">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-gray-700">Verifications</span>
              {verificationTrend > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500 ml-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 ml-1" />
              )}
            </div>
            <p className="text-xs text-gray-500">{verificationTrend.toFixed(1)}% vs last month</p>
          </div>
          <div className="text-right">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-gray-700">Flags</span>
              {flagTrend > 0 ? (
                <TrendingUp className="h-4 w-4 text-red-500 ml-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-green-500 ml-1" />
              )}
            </div>
            <p className="text-xs text-gray-500">{Math.abs(flagTrend).toFixed(1)}% vs last month</p>
          </div>
        </div>
      </div>
      
      <div className="relative h-64">
        <div className="flex items-end justify-between h-full space-x-2">
          {chartData.map((data, index) => {
            const verificationHeight = (data.verifications / maxVerifications) * 100;
            const flagHeight = (data.flags / maxFlags) * 100;
            
            return (
              <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                <div className="relative w-full flex items-end justify-center space-x-1 h-48">
                  {/* Verifications Bar */}
                  <div className="relative">
                    <div
                      className="bg-blue-500 rounded-t-sm w-6 transition-all duration-300 hover:bg-blue-600 group relative"
                      style={{ height: `${verificationHeight}%` }}
                    >
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {data.verifications} verifications
                      </div>
                    </div>
                  </div>
                  
                  {/* Flags Bar */}
                  <div className="relative">
                    <div
                      className="bg-red-500 rounded-t-sm w-6 transition-all duration-300 hover:bg-red-600 group relative"
                      style={{ height: `${(flagHeight / 100) * 48}px` }}
                    >
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {data.flags} flags
                      </div>
                    </div>
                  </div>
                </div>
                
                <span className="text-xs font-medium text-gray-600">{data.period}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}