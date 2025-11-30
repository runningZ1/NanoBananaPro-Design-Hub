import {ScrollView, Text, View} from '@tarojs/components'
import Taro from '@tarojs/taro'
import type React from 'react'
import {FEATURES} from '@/types/features'

const Home: React.FC = () => {
  const handleFeatureClick = (featureId: string) => {
    console.log('点击功能卡片:', featureId)

    if (featureId === 'object-6-views') {
      console.log('跳转到物体6视图页面')
      Taro.navigateTo({
        url: '/pages/object-6-views/index'
      })
        .then(() => {
          console.log('跳转成功')
        })
        .catch((error) => {
          console.error('跳转失败:', error)
          Taro.showToast({
            title: '页面跳转失败',
            icon: 'none',
            duration: 2000
          })
        })
    } else {
      console.log('跳转到功能详情页:', featureId)
      Taro.navigateTo({
        url: `/pages/feature/index?id=${featureId}`
      })
        .then(() => {
          console.log('跳转成功')
        })
        .catch((error) => {
          console.error('跳转失败:', error)
          Taro.showToast({
            title: '页面跳转失败',
            icon: 'none',
            duration: 2000
          })
        })
    }
  }

  return (
    <View className="min-h-screen bg-background">
      <ScrollView scrollY className="h-screen box-border">
        <View className="p-4">
          <View className="mb-6">
            <Text className="text-2xl font-bold text-foreground block mb-2">AI图片编辑专家</Text>
            <Text className="text-sm text-muted-foreground block">专业的AI图片处理工具，20+强大功能</Text>
          </View>

          <View className="grid grid-cols-2 gap-3">
            {FEATURES.map((feature) => (
              <View
                key={feature.id}
                className="bg-card rounded-lg p-4 card-shadow card-hover relative"
                hoverClass="opacity-80"
                onTap={() => handleFeatureClick(feature.id)}>
                {feature.isNew && (
                  <View className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    <Text>new</Text>
                  </View>
                )}

                <View className="flex flex-col items-center">
                  <View className={`${feature.icon} text-4xl text-primary mb-3`} />
                  <Text className="text-sm font-medium text-card-foreground text-center block mb-1">
                    {feature.name}
                  </Text>
                  <Text className="text-xs text-muted-foreground text-center block line-clamp-2">
                    {feature.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View className="mt-6 mb-4 text-center">
            <Text className="text-xs text-muted-foreground block">更多功能持续更新中...</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Home
