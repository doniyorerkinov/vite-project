import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const Calendar = ({ type = 'single', onDateSelect }) => {
  const currentDate = dayjs();
  const format = 'D/M/YYYY';

  return (
    <div className="w-fit h-full">
      {type === 'range' ? (
        <RangePicker
          defaultValue={[currentDate, currentDate]}
          format={format}
          placeholder={[currentDate.format(format), currentDate.format(format)]}
          onChange={(dates, dateStrings) =>
            onDateSelect && onDateSelect(dates, dateStrings)
          }
          className="w-full h-full"
        />
      ) : (
        <DatePicker
          defaultValue={currentDate}
          format={format}
          placeholder={currentDate.format(format)}
          onChange={(date, dateString) =>
            onDateSelect && onDateSelect(date, dateString)
          }
          className="w-full h-full"
        />
      )}
    </div>
  );
};

export default Calendar;
