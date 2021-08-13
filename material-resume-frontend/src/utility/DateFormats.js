export const DATE_LONG_MONTH = 'DATE_LONG_MONTH';
export const DATE_SHORT_MONTH = 'DATE_SHORT_MONTH';
export const DATE_NUM_MONTH = 'DATE_NUM_MONTH';

export const DATE_TYPES = [
  DATE_LONG_MONTH,
  DATE_SHORT_MONTH,
  DATE_NUM_MONTH
]


export function formatDate(date, type, locale='sv'){
  switch(type){
    case DATE_LONG_MONTH: {
      let options = {year: 'numeric', month: 'long'}
      return date.toLocaleDateString(locale, options)
    }
    case DATE_SHORT_MONTH: {
      let options = {year: 'numeric', month: 'short'}
      return date.toLocaleDateString(locale, options)
    }
    case DATE_NUM_MONTH: {
      let options = {year: 'numeric', month: 'numeric'}
      return date.toLocaleDateString(locale, options)
    }
    default: {
      let options = {year: 'numeric', month: 'long'}
      return date.toLocaleDateString(locale, options)
    }
  }
}
