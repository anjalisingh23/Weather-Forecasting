import "./Days.css";

function Days({ day }) {
  const date = new Date(day.date);
  const dayOfWeek = date.getDay();
  const daysOfWeek = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  const curDay=daysOfWeek[dayOfWeek];
  return (
    <div className="day-cont">
      <p className="day">{(curDay).toUpperCase()}</p>
      <div className="status">
        <div className="icon">
          <img src={`/images/${day.icon}.svg`} />
        </div>
        <p>{day.weather_desc}</p>
      </div>
      <p className="Ftemp">{(day.temp - 273.15).toFixed(0)}&deg;C </p>
    </div>
  );
}

export default Days;
