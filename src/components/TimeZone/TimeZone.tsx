
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DayPilot } from "@daypilot/daypilot-lite-react";

const TimeZone = () => {


  // get timezone of user
  const getTimezone:string = (new DayPilot.Date().toDateLocal().toString());
  const extractTimezone:RegExpExecArray | null = /(GMT).*$/.exec(getTimezone);
  const timezoneString:string = extractTimezone![0];
 
  
  return timezoneString;
}


export default TimeZone;