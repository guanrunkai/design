export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault()
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }
}

export function onRouteChange() {
  if (window.hasError) {
    window.hasError = false
    window.location.reload()
  }
}
