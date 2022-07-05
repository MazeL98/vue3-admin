module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 验证提交类型
    'type-enum': [
      // 当前验证的错误级别
      2,
      // 在何时验证？
      'always',
      // 泛型内容（之前规定了提交类型有哪几种，就要验证这几种）
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'build'
      ]
    ],
    // 忽略“简约描述”的大小写
    'subject-case': [0]
  }
}
