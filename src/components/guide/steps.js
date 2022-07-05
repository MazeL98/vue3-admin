// 为什么不直接导出一个 steps 数组
// 因为 driver.js 在 layout.vue 上执行，而layout是页面一打开就生成的
// 此时 guide 也会被直接调用，但 i18n 还没有加载完成，因此改成函数-调用
// 这样就能指定 guide 加载的时机

const steps = (i18n) => {
  return [
    {
      element: '#guide-start',
      popover: {
        title: i18n.t('msg.guide.guideTitle'),
        description: i18n.t('msg.guide.guideDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-hamburger',
      popover: {
        title: i18n.t('msg.guide.hamburgerTitle'),
        description: i18n.t('msg.guide.hamburgerDesc')
      }
    },
    {
      element: '.breadcrumb',
      popover: {
        title: i18n.t('msg.guide.breadcrumbTitle'),
        description: i18n.t('msg.guide.breadcrumbDesc')
      }
    },
    {
      element: '#guide-search',
      popover: {
        title: i18n.t('msg.guide.searchTitle'),
        description: i18n.t('msg.guide.searchDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-full',
      popover: {
        title: i18n.t('msg.guide.fullTitle'),
        description: i18n.t('msg.guide.fullDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-theme',
      popover: {
        title: i18n.t('msg.guide.themeTitle'),
        description: i18n.t('msg.guide.themeDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-lang',
      popover: {
        title: i18n.t('msg.guide.langTitle'),
        description: i18n.t('msg.guide.langDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-tags',
      popover: {
        title: i18n.t('msg.guide.tagTitle'),
        description: i18n.t('msg.guide.tagDesc')
      }
    },
    {
      element: '#guide-sidebar',
      popover: {
        title: i18n.t('msg.guide.sidebarTitle'),
        description: i18n.t('msg.guide.sidebarDesc'),
        position: 'right-center'
      }
    }
  ]
}

export default steps
