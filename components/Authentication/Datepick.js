import { StyleSheet } from "react-native";
import React, { useState } from "react";
import DatePicker from "react-native-datepicker";

export default function Datepick() {
  const [date, setDate] = useState("09-10-2020");

  return (
    <DatePicker
      style={styles.datePickerStyle}
      date={date} // Initial date from state
      mode="date" // The enum of date, datetime and time
      placeholder="select date"
      format="DD-MM-YYYY"
      minDate="01-01-2016"
      maxDate="01-01-2019"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: {
          position: "absolute",
          left: 0,
          top: 4,
          marginLeft: 0,
        },
        dateInput: {
          marginLeft: 36,
        },
      }}
      onDateChange={(date) => {
        setDate(date);
      }}
    />
  );
}

const styles = StyleSheet.create({
  datePickerStyle: {
    width: 300,
    marginTop: 20,
    marginBottom: 20,
  },
});
