module.exports = (path, options) => {
  return options.defaultResolver(path, {
    ...options,
    packageFilter: (pkg) => {
      if (pkg.name === 'query-string') {
        delete pkg.exports
        delete pkg.module
      }
      return pkg
    },
  })
}
