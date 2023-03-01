const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const formatPrice = (price) => {
  return formatter.format(price);
};

function getDeltaTimeFromNow(date) {
  return new Intl.DateTimeFormat().format(new Date(date));
}

function formatDate(date) {
  if (date) {
    return new Intl.DateTimeFormat().format(new Date(date));
  }
}

function formatDateDash(date) {
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  if (date) {
    var newDate = new Date(date);
    var y = newDate.getFullYear();
    var m = newDate.getMonth() + 1;
    var d = newDate.getDate();
    // add a zero in front of numbers<10
    m = checkTime(m);
    d = checkTime(d);
    return y + "-" + m + "-" + d;
  }
}

function formatDateTime(date) {
  if (date) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    }).format(new Date(date));
  }
}

function dateToTimeStamp(date) {
  if (date) {
    const newDate = new Date(date);
    return newDate.getTime();
  }
  return 0;
}

function getDeltaDate(date, delta) {
  let tempDate = new Date(date);
  tempDate.setDate(tempDate.getDate() + delta);
  return tempDate;
}

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

function formatNumber(n, p, ts, dp) {
  var t = [];
  // Get arguments, set defaults
  if (typeof p == "undefined") p = 2;
  if (typeof ts == "undefined") ts = ",";
  if (typeof dp == "undefined") dp = ".";

  // Get number and decimal part of n
  n = Number(n).toFixed(p).split(".");

  // Add thousands separator and decimal point (if requied):
  for (
    var iLen = n[0].length, i = iLen ? iLen % 3 || 3 : 0, j = 0;
    i <= iLen;
    i += 3
  ) {
    t.push(n[0].substring(j, i));
    j = i;
  }
  // Insert separators and return result
  return t.join(ts) + (n[1] ? dp + n[1] : "");
}

function getMaxMinValue(_arr) {
  let max = 0;
  let min = 9999999999999999999999999999999;
  _arr.map((row, key) => {
    if (max < row.price) {
      max = row.price;
    }
    if (min > row.price) {
      min = row.price;
    }
  });
  return {
    max: max,
    min: min,
  };
}

function getMaxMinQuote(_arr) {
  let max = 0;
  let min = 9999999999999999999999999999999;
  _arr.map((row, key) => {
    if (max < row.volume_24h) {
      max = row.volume_24h;
    }
    if (min > row.volume_24h) {
      min = row.volume_24h;
    }
  });
  return {
    max: max,
    min: min,
  };
}

export {
  getDeltaTimeFromNow,
  formatDate,
  formatPrice,
  getDeltaDate,
  formatDateTime,
  formatDateDash,
  validURL,
  formatNumber,
  getMaxMinValue,
  dateToTimeStamp,
  getMaxMinQuote,
};
