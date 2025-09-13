import React from 'react';
import { Clock, CheckCircle, XCircle, AlertTriangle, Eye } from 'lucide-react';

interface Activity {
  id: string;
  type: 'verification' | 'flag' | 'approval';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
  user: string;
}

const recentActivities: Activity[] = [
  {
    id: '1',
    type: 'verification',
    title: 'Certificate Verified',
    description: 'Bachelor of Engineering - ABC University',
    timestamp: '2 minutes ago',
    status: 'success',
    user: 'John Doe'
  },
  {
    id: '2',
    type: 'flag',
    title: 'Suspicious Document Flagged',
    description: 'Potential forgery detected in MBA certificate',
    timestamp: '15 minutes ago',
    status: 'error',
    user: 'System Alert'
  },
  {
    id: '3',
    type: 'verification',
    title: 'Batch Verification Completed',
    description: '45 certificates processed for XYZ College',
    timestamp: '1 hour ago',
    status: 'success',
    user: 'Admin Panel'
  },
  {
    id: '4',
    type: 'approval',
    title: 'Institution Added',
    description: 'New institution "DEF Institute" approved',
    timestamp: '2 hours ago',
    status: 'success',
    user: 'Admin Panel'
  },
  {
    id: '5',
    type: 'flag',
    title: 'Multiple Verification Attempts',
    description: 'Same certificate verified 5 times in 1 hour',
    timestamp: '3 hours ago',
    status: 'warning',
    user: 'Security Monitor'
  }
];

export function RecentActivity() {
  const getActivityIcon = (type: string, status: string) => {
    switch (type) {
      case 'verification':
        return status === 'success' ? 
          <CheckCircle className="h-5 w-5 text-green-500" /> :
          <XCircle className="h-5 w-5 text-red-500" />;
      case 'flag':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'approval':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className={`p-4 hover:bg-gray-50 transition-colors border-l-4 ${
              activity.status === 'success' ? 'border-l-green-400' :
              activity.status === 'warning' ? 'border-l-yellow-400' :
              'border-l-red-400'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getActivityIcon(activity.type, activity.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">by {activity.user}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}