export const DATE_LONG_MONTH = 'DATE_LONG_MONTH';
export const DATE_SHORT_MONTH = 'DATE_SHORT_MONTH';
export const DATE_NUM_MONTH = 'DATE_NUM_MONTH';

export const DATE_TYPES = [
  DATE_LONG_MONTH,
  DATE_SHORT_MONTH,
  DATE_NUM_MONTH
]


export function formatDate(date, type, locale='sv'){
  // TODO: add proper error handling
  let usedDate = date
  if(typeof(date) === 'string'){
    usedDate = new Date(date);
  }
  switch(type){
    case DATE_LONG_MONTH: {
      let options = {year: 'numeric', month: 'long'}
      return usedDate.toLocaleDateString(locale, options)
    }
    case DATE_SHORT_MONTH: {
      let options = {year: 'numeric', month: 'short'}
      return usedDate.toLocaleDateString(locale, options)
    }
    case DATE_NUM_MONTH: {
      let options = {year: 'numeric', month: 'numeric'}
      return usedDate.toLocaleDateString(locale, options)
    }
    default: {
      let options = {year: 'numeric', month: 'long'}
      return usedDate.toLocaleDateString(locale, options)
    }
  }
}
