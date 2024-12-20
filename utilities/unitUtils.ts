// src/utilities/unitUtils.ts

export type Unit = 'feet' | 'meters';

export const convertLength = (value: number | string, fromUnit: Unit, toUnit: Unit): number => {
  // Convert string to number if needed
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) return 0;
  if (fromUnit === toUnit) return numValue;
  
  // Convert feet to meters
  if (fromUnit === 'feet' && toUnit === 'meters') {
    return Number((numValue * 0.3048).toFixed(1));
  }
  
  // Convert meters to feet
  if (fromUnit === 'meters' && toUnit === 'feet') {
    return Number((numValue / 0.3048).toFixed(1));
  }
  
  return numValue;
};

export const formatLength = (value: number | string, unit: Unit): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return '0';
  
  return `${numValue.toFixed(1)} ${unit === 'feet' ? 'ft' : 'm'}`;
};

// Store values in standard unit (feet)
export const storeLength = (value: string, fromUnit: Unit): string => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return '0';
  
  return fromUnit === 'feet' 
    ? numValue.toString()
    : convertLength(numValue, 'meters', 'feet').toString();
};