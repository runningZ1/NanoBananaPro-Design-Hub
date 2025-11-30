import {Button, Image, RichText, ScrollView, Text, View} from '@tarojs/components'
import Taro from '@tarojs/taro'
import {createChatDataHandler, sendChatStream} from 'miaoda-taro-utils/chatStream'
import type React from 'react'
import {useCallback, useState} from 'react'
import {compressImage, imageToBase64} from '@/utils/imageUtils'

const APP_ID = process.env.TARO_APP_APP_ID || ''
const API_ENDPOINT = 'https://api-integrations.appmiaoda.com/app-7vrr7h77m70h/api-2jBYdN3A9Jyz/v2/chat/completions'

const EXAMPLE_IMAGE =
  'https://miaoda-conversation-file.cdn.bcebos.com/user-2904tfph1wjk/conv-7vrr7h77m70g/20251129/file-7vs3g4rp7chs.png'

const PRESET_PROMPTS = [
  '请详细分析这个物体的结构、材质、颜色和设计特点，并描述如何从不同角度观察它',
  '请识别这个物体的类型，并说明从前后左右上下六个角度观察时，每个角度的主要特征',
  '请分析这个物体的3D结构，描述它的正面、背面、左侧、右侧、顶部和底部的视觉特征',
  '请描述这个物体的全方位特征，包括各个视角下的形状、纹理和细节',
  '请提供这个物体的360度分析，说明从不同角度看到的关键特征和差异'
]

const Object6Views: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedPrompt, setSelectedPrompt] = useState<string>(PRESET_PROMPTS[0])
  const [aiAnalysis, setAiAnalysis] = useState<string>('')
  const [showPrompts, setShowPrompts] = useState(false)

  // 选择图片
  const handleChooseImage = useCallback(async () => {
    try {
      const res = await Taro.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera']
      })

      if (res.tempFilePaths && res.tempFilePaths.length > 0) {
        setSelectedImage(res.tempFilePaths[0])
        setAiAnalysis('')
        Taro.showToast({
          title: '图片选择成功',
          icon: 'success',
          duration: 1500
        })
      }
    } catch (error) {
      console.error('选择图片失败:', error)
      Taro.showToast({
        title: '图片选择失败',
        icon: 'error',
        duration: 2000
      })
    }
  }, [])

  // 使用示例图片
  const handleUseExample = useCallback(() => {
    setSelectedImage(EXAMPLE_IMAGE)
    setAiAnalysis('')
    Taro.showToast({
      title: '已加载示例图片',
      icon: 'success',
      duration: 1500
    })
  }, [])

  // AI分析图片
  const handleAnalyze = useCallback(async () => {
    if (!selectedImage) {
      Taro.showToast({
        title: '请先选择图片',
        icon: 'none',
        duration: 2000
      })
      return
    }

    setIsAnalyzing(true)
    setAiAnalysis('')

    try {
      Taro.showLoading({
        title: 'AI分析中...',
        mask: true
      })

      // 压缩图片
      const compressedPath = await compressImage(selectedImage, 0.7)

      // 转换为Base64
      const base64Image = await imageToBase64(compressedPath)

      // 创建数据处理器
      const handleData = createChatDataHandler((content) => {
        setAiAnalysis(content)
      })

      // 发送流式请求
      sendChatStream({
        endpoint: API_ENDPOINT,
        appId: APP_ID,
        messages: [
          {
            role: 'system',
            content: '你是一个专业的3D视觉分析专家，擅长从多个角度分析物体的结构和特征。'
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: selectedPrompt
              },
              {
                type: 'image_url',
                image_url: {
                  url: base64Image
                }
              }
            ]
          }
        ],
        onUpdate: handleData,
        onComplete: () => {
          setIsAnalyzing(false)
          Taro.hideLoading()
          Taro.showToast({
            title: '分析完成',
            icon: 'success',
            duration: 1500
          })
        },
        onError: (error: Error) => {
          console.error('AI分析出错:', error)
          setIsAnalyzing(false)
          Taro.hideLoading()
          Taro.showToast({
            title: '分析失败，请重试',
            icon: 'error',
            duration: 2000
          })
        }
      })
    } catch (error) {
      console.error('图片处理失败:', error)
      setIsAnalyzing(false)
      Taro.hideLoading()
      Taro.showToast({
        title: '图片处理失败',
        icon: 'error',
        duration: 2000
      })
    }
  }, [selectedImage, selectedPrompt])

  return (
    <View className="min-h-screen bg-background">
      <ScrollView scrollY className="h-screen box-border">
        <View className="p-4">
          {/* 页面标题 */}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-foreground block mb-2">物体6视图分析</Text>
            <Text className="text-sm text-muted-foreground block">上传物体图片，AI将分析物体的六个视角特征</Text>
          </View>

          {/* 图片选择区域 */}
          <View className="bg-card rounded-lg p-4 mb-4 card-shadow">
            <Text className="text-base font-medium text-card-foreground block mb-3">选择图片</Text>

            {selectedImage ? (
              <View className="mb-3">
                <Image src={selectedImage} mode="aspectFit" className="w-full h-64 rounded-lg bg-muted" />
              </View>
            ) : (
              <View className="w-full h-64 rounded-lg bg-muted flex items-center justify-center mb-3">
                <View className="text-center">
                  <View className="i-mdi-image-outline text-6xl text-muted-foreground mb-2" />
                  <Text className="text-sm text-muted-foreground block">请选择或上传图片</Text>
                </View>
              </View>
            )}

            <View className="flex gap-2">
              <Button
                className="flex-1 bg-primary text-primary-foreground py-3 rounded break-keep text-sm"
                size="default"
                onTap={handleChooseImage}>
                <View className="flex items-center justify-center gap-1">
                  <View className="i-mdi-upload text-lg" />
                  <Text>选择图片</Text>
                </View>
              </Button>
              <Button
                className="flex-1 bg-secondary text-secondary-foreground py-3 rounded break-keep text-sm"
                size="default"
                onTap={handleUseExample}>
                <View className="flex items-center justify-center gap-1">
                  <View className="i-mdi-image-multiple text-lg" />
                  <Text>使用示例</Text>
                </View>
              </Button>
            </View>
          </View>

          {/* 提示词选择区域 */}
          <View className="bg-card rounded-lg p-4 mb-4 card-shadow">
            <View className="flex items-center justify-between mb-3" onTap={() => setShowPrompts(!showPrompts)}>
              <Text className="text-base font-medium text-card-foreground">分析提示词</Text>
              <View className={`i-mdi-chevron-${showPrompts ? 'up' : 'down'} text-xl text-muted-foreground`} />
            </View>

            {showPrompts && (
              <View className="space-y-2">
                {PRESET_PROMPTS.map((prompt, index) => (
                  <View
                    key={index}
                    className={`p-3 rounded-lg border ${
                      selectedPrompt === prompt
                        ? 'bg-primary/10 border-primary'
                        : 'bg-muted border-border hover:bg-muted/80'
                    }`}
                    onTap={() => {
                      setSelectedPrompt(prompt)
                      Taro.showToast({
                        title: '提示词已选择',
                        icon: 'success',
                        duration: 1000
                      })
                    }}>
                    <Text className="text-sm text-foreground block">{prompt}</Text>
                  </View>
                ))}
              </View>
            )}

            {!showPrompts && (
              <View className="p-3 rounded-lg bg-muted">
                <Text className="text-sm text-foreground block">{selectedPrompt}</Text>
              </View>
            )}
          </View>

          {/* 分析按钮 */}
          <Button
            className="w-full bg-primary text-primary-foreground py-4 rounded break-keep text-base mb-4"
            size="default"
            disabled={isAnalyzing || !selectedImage}
            onTap={handleAnalyze}>
            <View className="flex items-center justify-center gap-2">
              {isAnalyzing ? (
                <>
                  <View className="i-mdi-loading animate-spin text-xl" />
                  <Text>AI分析中...</Text>
                </>
              ) : (
                <>
                  <View className="i-mdi-cube-scan text-xl" />
                  <Text>开始AI分析</Text>
                </>
              )}
            </View>
          </Button>

          {/* AI分析结果 */}
          {aiAnalysis && (
            <View className="bg-card rounded-lg p-4 card-shadow">
              <View className="flex items-center gap-2 mb-3">
                <View className="i-mdi-robot text-2xl text-primary" />
                <Text className="text-base font-medium text-card-foreground">AI分析结果</Text>
              </View>
              <View className="bg-muted rounded-lg p-4">
                <RichText nodes={aiAnalysis.replace(/\n/g, '<br/>')} className="text-sm text-foreground" />
              </View>
            </View>
          )}

          {/* 功能说明 */}
          {!aiAnalysis && !isAnalyzing && (
            <View className="bg-accent/10 rounded-lg p-4 border border-accent/20">
              <View className="flex items-start gap-2">
                <View className="i-mdi-information text-xl text-accent mt-0.5" />
                <View className="flex-1">
                  <Text className="text-sm text-accent-foreground block mb-2 font-medium">功能说明</Text>
                  <Text className="text-xs text-accent-foreground/80 block mb-1">1. 选择或上传物体图片</Text>
                  <Text className="text-xs text-accent-foreground/80 block mb-1">2. 选择合适的分析提示词</Text>
                  <Text className="text-xs text-accent-foreground/80 block mb-1">3. 点击"开始AI分析"按钮</Text>
                  <Text className="text-xs text-accent-foreground/80 block">4. AI将分析物体的六个视角特征</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default Object6Views
