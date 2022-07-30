export default {
  login: {
    title: 'User Login',
    loginBtn: 'Login',
    usernameRule: 'Username is required',
    passwordRule: 'Password cannot be less than 6 digits',
    desc: `
    Test authority account:<br />
     Provide three kinds of authority accounts:<br />
     1. Super administrator account: super-admin <br />
     2. Administrator account: admin <br />
     3. Test configurable account: test <br />
     The uniform password is: 123456 <br />
     <br />
     Import user account:<br />
     You can log in with the imported username <br />
     The password is unified as: 123456 <br />
     <b>Note: Import user-discriminatory Chinese and English libraries! ! ! ! </b>
    `
  },
  route: {
    dashboard: 'Dashboard',
    profile: 'Profile',
    staff: 'Staff',
    excelImport: 'Excel Import',
    staffManage: 'Employee Manage',
    staffInfo: 'Staff Info',
    roleList: 'Role List',
    permissionList: 'Permission List',
    article: 'Article',
    articleRanking: 'Article Ranking',
    articleCreate: 'Article Create',
    articleDetail: 'Article Detail',
    articleEditor: 'Article Editor'
  },
  toast: {
    switchLangSuccess: 'Switch Language Success'
  },
  tagsView: {
    refresh: 'Refresh',
    closeRight: 'Close Rights',
    closeOther: 'Close Others'
  },
  theme: {
    themeColorChange: 'Theme Color Change',
    themeChange: 'Theme Change'
  },
  universal: {
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  navBar: {
    themeChange: 'Theme Modification',
    headerSearch: 'Page Search',
    screenfull: 'Full Screen Replacement',
    lang: 'Globalization',
    guide: 'Function Guide',
    home: 'Home',
    profile: 'My Profile',
    logout: 'Log out'
  },
  guide: {
    close: 'Close',
    next: 'Next',
    prev: 'Previous',
    guideTitle: 'Guidance',
    guideDesc: 'Turn on the boot function',
    hamburgerTitle: 'Hamburger button',
    hamburgerDesc: 'Open and close the left menu',
    breadcrumbTitle: 'Bread crumbs',
    breadcrumbDesc: 'Indicates the current page position',
    searchTitle: 'Search',
    searchDesc: 'Page link search',
    fullTitle: 'Full Screen',
    fullDesc: 'Page display switching',
    themeTitle: 'Theme',
    themeDesc: 'Change project theme',
    langTitle: 'Globalization',
    langDesc: 'Language switch',
    tagTitle: 'Label',
    tagDesc: 'Opened page tab',
    sidebarTitle: 'Menu',
    sidebarDesc: 'Project function menu'
  },
  profile: {
    muted:
      '"Vue3 rewrite vue-element-admin, realize the back-end front-end integrated solution" project demonstration',
    introduce: 'Introduce',
    projectIntroduction: 'Project Introduction',
    projectFeature: 'Project Feature',
    feature: 'Feature',
    update: 'Update',
    author: 'Author',
    name: 'Sunday',
    job: 'A front-end development program',
    Introduction:
      'A senior technical expert, once worked in a domestic first-line Internet company, and has coordinated multiple large-scale projects with more than tens of millions of users. Committed to researching big front-end technology, he has been invited to participate in domestic front-end technology sharing sessions many times, such as: Google China Technology Sharing Session in 2018.'
  },
  staffInfo: {
    print: 'Print',
    title: 'Employee information',
    name: 'Name',
    sex: 'Gender',
    nation: 'Nationality',
    mobile: 'Phone Number',
    province: 'Place of Residence',
    date: 'Entry Time',
    remark: 'Remark',
    address: 'Contact Address',
    experience: 'Experience',
    major: 'Professional',
    glory: 'Prize',
    foot: 'Signature:___________Date:___________'
  },
  uploadExcel: {
    upload: 'Click upload',
    drop: 'Drag files here'
  },
  excel: {
    importExcel: 'Excel Import',
    exportExcel: 'Excel Export',
    exportZip: 'Zip Export',
    name: 'Name',
    mobile: 'Contact Details',
    avatar: 'Avatar',
    role: 'Role',
    openTime: 'Opening time',
    action: 'Operate',
    show: 'Check',
    showRole: 'Role',
    defaultRole: 'Staff',
    remove: 'Delete',
    removeSuccess: 'Deleted Successfully',
    title: 'Export to Excel',
    placeholder: 'Excel File Name',
    defaultName: 'Staff Management Form',
    close: 'Cancel',
    confirm: 'Export',
    importSuccess: ' Employee data imported successfully',
    dialogTitle1: 'Are you sure you want to delete the user ',
    dialogTitle2: ' Is it?',
    roleDialogTitle: 'Configure roles'
  },
  role: {
    buttonTxt: 'New Role',
    index: 'Serial Number',
    name: 'Name',
    desc: 'Description',
    action: 'Operate',
    assignPermissions: 'Assign Permissions',
    removeRole: 'Delete Role',
    dialogTitle: 'New Role',
    dialogRole: 'Role Name',
    dialogDesc: 'Role Description',
    updateRoleSuccess: 'User role updated successfully'
  },
  permission: {
    name: 'Authority name',
    mark: 'Authority ID',
    desc: 'Permission description'
  },
  article: {
    ranking: 'Ranking',
    title: 'Title',
    author: 'Author',
    publicDate: 'Release Time',
    desc: 'Brief Introduction',
    action: 'Operate',
    dynamicTitle: 'Dynamic Display',
    show: 'Check',
    remove: 'Delete',
    edit: 'Editor',
    dialogTitle1: 'Are you sure you want to delete the article ',
    dialogTitle2: ' NS?',
    removeSuccess: 'Article deleted successfully',
    titlePlaceholder: 'Please enter the title of the article',
    markdown: 'Markdown',
    richText: 'Rich Text',
    commit: 'Commit',
    createSuccess: 'The article was created successfully',
    editorSuccess: 'Article modified successfully',
    sortSuccess: 'Article ranking modified successfully'
  },
  dashboard: {
    orderTab: 'Order',
    profitTab: 'Profit',
    monthly: 'Monthly Revenue',
    todayIncome: 'Today Income',
    todayExpense: 'Today Expense',
    todayBalance: 'Today Balance',
    lineChartTitle: 'Revenue in the last seven days',
    measurement: '10k CNY',
    barChartTitle: 'Daily Profit',
    income: 'Income',
    expense: 'Expense',
    balance: 'Balance'
  }
}
