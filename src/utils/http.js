import axios from 'axios';

const getMethod = (url, params = {}) =>
  new Promise((resolve, reject) => {
    axios.get(url, params)
      .then((resp) => {
        resolve({
          code: resp.code,
          data: resp.data
        })
      })
      .catch((errResp) => reject(errResp));
  });

const postMethod = (url, body) =>
  new Promise((resolve, reject) => {
    console.log(body);
    
    axios.post(url, body)
      .then((resp) => {
        resolve({
          code: resp.data.code,
          data: typeof resp.data.data !== 'undefined' ? resp.data.data : resp.data,
          headers: resp.headers
        });
      })
      .catch((errResp) => reject(errResp));
  });

const getAllCookie = () => {
  const cookieDatas = document.cookie;
  const cookieSplit = cookieDatas.split(';');

  return cookieSplit.length > 0 ? cookieSplit.map((cookieData) => {
    const [name = '', value = ''] = cookieData.split('=');
    return { name: name.trim(), value: value.trim() };
  }) : '';
}

// 쿠키 가져오기
const getCookie = (cName) => {
  cName = `${cName}=`;
  const cookieData = document.cookie;
  let start = cookieData.indexOf(cName);
  let cValue = '';
  if (start !== -1) {
    start += cName.length;
    let end = cookieData.indexOf(';', start);
    if (end === -1) end = cookieData.length;
    cValue = cookieData.substring(start, end);
  }
  return unescape(cValue);
}

export {
  getMethod,
  postMethod,
  getCookie,
  getAllCookie,
}