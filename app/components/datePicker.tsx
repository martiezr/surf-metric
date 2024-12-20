import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import DateTimePickerModal from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useTheme } from '../contexts/themeContext';
import { createStyles } from '../../styles';

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  label: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, label }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [show, setShow] = useState(false);

  const handleChange = (_: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const displayDate = value ? format(value, 'MMM dd, yyyy') : 'Select date';

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={[styles.input, { justifyContent: 'center' }]}
      >
        <Text style={[
          styles.text,
          !value && { color: theme.placeholderText }
        ]}>
          {displayDate}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePickerModal
          value={value || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

export default DatePicker;