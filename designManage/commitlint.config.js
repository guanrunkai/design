/* eslint-disable */
const { commitPrefix } = require('./.cz-config.js')

module.exports = {
  plugins: [
    {
      rules: {
        'svn-standard': ({ header }) => {
          let valid = false
          let msg = ''
          for (const item of commitPrefix) {
            if (header.startsWith(item)) {
              msg = header.substr(item.length)
              if (msg.length === 0) {
                return [false, 'commit message can not be empty!']
              }
              valid = true
              break
            }
          }
          return [valid, `Your commit should starts with ${commitPrefix.join(' | ')}`]
        }
      }
    }
  ],
  rules: {
    'svn-standard': [2, 'always'],
    'header-max-length': [2, 'always', 100],
    'subject-case': [0]
  }
}
