import { useQuery } from '@tanstack/react-query';



const fetchStats = async () => {
  // Simulate API call
  return [
    { title: 'Total Revenue', value: '$54,239', change: '+12.5%' },
    { title: 'Total Orders', value: '1,324', change: '+8.2%' },
    { title: 'Total Customers', value: '8,492', change: '+5.3%' },
    { title: 'Avg. Order Value', value: '$42.8', change: '+3.7%' },
  ];
};

export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
  });
};