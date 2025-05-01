import { useQuery } from '@tanstack/react-query';



const fetchOrders = async () => {
  // Simulate API call
  return [
    { id: '#12345', customer: 'Sarah Johnson', status: 'Completed', amount: '$126.00' },
    { id: '#12346', customer: 'Michael Brown', status: 'Pending', amount: '$82.50' },
    { id: '#12347', customer: 'Emma Wilson', status: 'Processing', amount: '$249.99' },
    { id: '#12348', customer: 'James Miller', status: 'Completed', amount: '$175.25' },
  ];
};

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });
};