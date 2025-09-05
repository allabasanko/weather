import { City } from '@/types';
import geoApi from '../api/coords';

export const fetchCoordinates = async (city: string): Promise<City[] | []> => {
  const searchParams = {
    name: city,
    count: 3,
    language: 'en',
    format: 'json',
  };
  try {
    const response = await geoApi.get('', { params: searchParams });

    if (!response.data.results || response.data.results.length === 0) {
      return [];
    }
    const citiesList = response?.data?.results;

    return citiesList;
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
};
