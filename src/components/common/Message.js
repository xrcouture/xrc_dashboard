import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

toastr.options = {
  positionClass: 'toast-top-right',
  timeOut: 5000,
  extendedTimeOut: 1000,
  // closeButton: closeButton,
  // debug: debug,
  progressBar: true,
  preventDuplicates: true,
  newestOnTop: true,
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
  showDuration: 1000,
  hideDuration: 2000,
}

export const ErrorMessage = (message, title) => {
  return toastr.error(message, title)
}
export const InfoMessage = (message, title) => {
  return toastr.info(message, title)
}

export const WarningMessage = (message, title) => {
  return toastr.warning(message, title)
}

export const SuccessMessage = (message, title) => {
  return toastr.success(message, title)
}
