const pages = ['pages/home/index', 'pages/feature/index', 'pages/object-6-views/index']

export default defineAppConfig({
  pages,
  tabBar: {
    color: '#8B9AAB',
    selectedColor: '#4A90E2',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '功能'
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#4A90E2',
    navigationBarTitleText: 'AI图片编辑专家',
    navigationBarTextStyle: 'white'
  }
})
