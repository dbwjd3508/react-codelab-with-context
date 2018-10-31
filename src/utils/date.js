import * as _ from './functional';


const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const cv = n => n < 10 ? `0${n}` : n;

const baseSub = (date, now) => {
  return Math.abs(date - now);
}

const baseDiff = time => val => {
  return parseInt(val / time);
}

const convertDate = (date, now) => (base) => {
  return _.go(
    baseSub(date, now),
    baseDiff(base),
    time => ((date = date - time * base), time),
  )
}

function diffDate(date) {
  date = new Date(date);
  const now = new Date();
  const df = convertDate(date, now);

  const d = df(DAY);

  const h = df(HOUR);

  const m = df(MINUTE);

  const s = df(SECOND);

  return {
    day: cv(d), hour: cv(h),
    minute: cv(m), second: cv(s)
  }
}

export {
  diffDate,
}
