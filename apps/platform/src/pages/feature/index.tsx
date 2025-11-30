import {Button, Image, ScrollView, Text, View} from '@tarojs/components'
import Taro from '@tarojs/taro'
import type React from 'react'
import {useEffect, useState} from 'react'
import {FEATURES, type Feature} from '@/types/features'

const FeatureDetail: React.FC = () => {
  const [feature, setFeature] = useState<Feature | null>(null)
  const [selectedPrompt, setSelectedPrompt] = useState<string>('')
  const [uploadedImage, setUploadedImage] = useState<string>('')

  useEffect(() => {
    const instance = Taro.getCurrentInstance()
    const featureId = instance.router?.params?.id

    if (featureId) {
      const foundFeature = FEATURES.find((f) => f.id === featureId)
      if (foundFeature) {
        setFeature(foundFeature)
        setSelectedPrompt(foundFeature.prompts[0])
      }
    }
  }, [])

  const handleChooseImage = async () => {
    try {
      const res = await Taro.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera']
      })

      if (res.tempFilePaths && res.tempFilePaths.length > 0) {
        setUploadedImage(res.tempFilePaths[0])
        Taro.showToast({
          title: '图片上传成功',
          icon: 'success',
          duration: 2000
        })
      }
    } catch (_error) {
      Taro.showToast({
        title: '图片上传失败',
        icon: 'none',
        duration: 2000
      })
    }
  }

  const handleProcess = () => {
    if (!uploadedImage) {
      Taro.showToast({
        title: '请先上传图片',
        icon: 'none',
        duration: 2000
      })
      return
    }

    Taro.showLoading({
      title: '处理中...'
    })

    setTimeout(() => {
      Taro.hideLoading()
      Taro.showToast({
        title: 'AI处理功能即将上线',
        icon: 'none',
        duration: 2000
      })
    }, 1500)
  }

  if (!feature) {
    return (
      <View className="flex items-center justify-center h-screen bg-background">
        <Text className="text-muted-foreground">加载中...</Text>
      </View>
    )
  }

  return (
    <View className="min-h-screen bg-background">
      <ScrollView scrollY className="h-screen box-border">
        <View className="p-4">
          <View className="bg-card rounded-lg p-6 card-shadow mb-4">
            <View className="flex items-center mb-4">
              <View className={`${feature.icon} text-5xl text-primary mr-4`} />
              <View className="flex-1">
                <Text className="text-xl font-bold text-card-foreground block mb-1">{feature.name}</Text>
                <Text className="text-sm text-muted-foreground block">{feature.description}</Text>
              </View>
            </View>
          </View>

          <View className="bg-card rounded-lg p-4 card-shadow mb-4">
            <Text className="text-base font-semibold text-card-foreground block mb-3">上传图片</Text>

            {uploadedImage ? (
              <View className="mb-3">
                <Image src={uploadedImage} mode="aspectFit" className="w-full h-48 rounded-lg bg-secondary" />
              </View>
            ) : (
              <View className="w-full h-48 rounded-lg bg-secondary flex items-center justify-center mb-3">
                <View className="text-center">
                  <View className="i-mdi-image-plus text-5xl text-muted-foreground mb-2" />
                  <Text className="text-sm text-muted-foreground block">点击下方按钮上传图片</Text>
                </View>
              </View>
            )}

            <Button
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg break-keep text-base"
              size="default"
              onClick={handleChooseImage}>
              {uploadedImage ? '重新上传' : '选择图片'}
            </Button>
          </View>

          <View className="bg-card rounded-lg p-4 card-shadow mb-4">
            <Text className="text-base font-semibold text-card-foreground block mb-3">预制提示词</Text>

            <View className="flex flex-col gap-2">
              {feature.prompts.map((prompt, index) => (
                <View
                  key={index}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedPrompt === prompt ? 'border-primary bg-accent' : 'border-border bg-background'
                  }`}
                  onClick={() => setSelectedPrompt(prompt)}>
                  <Text
                    className={`text-sm block ${
                      selectedPrompt === prompt ? 'text-accent-foreground font-medium' : 'text-foreground'
                    }`}>
                    {prompt}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="bg-card rounded-lg p-4 card-shadow mb-4">
            <Text className="text-base font-semibold text-card-foreground block mb-3">示例效果</Text>

            {feature.exampleImage ? (
              <View className="mb-3">
                <Image
                  src={feature.exampleImage}
                  mode="aspectFit"
                  className="w-full rounded-lg bg-secondary"
                  style={{height: '200px'}}
                />
              </View>
            ) : (
              <View className="grid grid-cols-2 gap-3">
                <View className="bg-secondary rounded-lg h-32 flex items-center justify-center">
                  <View className="text-center">
                    <View className="i-mdi-image text-3xl text-muted-foreground mb-1" />
                    <Text className="text-xs text-muted-foreground block">处理前</Text>
                  </View>
                </View>
                <View className="bg-secondary rounded-lg h-32 flex items-center justify-center">
                  <View className="text-center">
                    <View className="i-mdi-image-check text-3xl text-primary mb-1" />
                    <Text className="text-xs text-muted-foreground block">处理后</Text>
                  </View>
                </View>
              </View>
            )}

            <View className="mt-3 p-3 bg-accent rounded-lg">
              <Text className="text-xs text-accent-foreground block">
                💡 提示：上传图片后，选择合适的提示词，即可开始AI处理
              </Text>
            </View>
          </View>

          <Button
            className="w-full bg-primary text-primary-foreground py-4 rounded-lg break-keep text-base mb-4"
            size="default"
            onClick={handleProcess}>
            开始处理
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}

export default FeatureDetail
