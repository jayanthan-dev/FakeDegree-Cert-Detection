import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    totalVerifications: number;
    verifiedCertificates: number;
    flaggedDocuments: number;
    pendingVerifications: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Verifications',
      value: stats.totalVerifications.toLocaleString(),
      icon: Shield,
      color: 'bg-blue-500',
      change: '+12.5%',
      changeType: 'increase' as const,
    },
    {
      title: 'Verified Certificates',
      value: stats.verifiedCertificates.toLocaleString(),
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+8.2%',
      changeType: 'increase' as const,
    },
    {
      title: 'Flagged Documents',
      value: stats.flaggedDocuments.toLocaleString(),
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: '-5.1%',
      changeType: 'decrease' as const,
    },
    {
      title: 'Pending Verifications',
      value: stats.pendingVerifications.toLocaleString(),
      icon: Clock,
      color: 'bg-orange-500',
      change: '+3.7%',
      changeType: 'increase' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    card.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}