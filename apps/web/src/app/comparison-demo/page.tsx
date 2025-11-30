import ImageComparisonSlider from '@/components/ImageComparisonSlider';

export default function ComparisonDemoPage() {
    return (
        <div className="min-h-screen bg-gray-950 text-white p-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Image Comparison Slider
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Interactive before/after comparison component
                    </p>
                </header>

                <section className="space-y-6">
                    <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm">
                        <h2 className="text-xl font-semibold mb-4 text-gray-200">Default Style</h2>
                        <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                            <ImageComparisonSlider
                                beforeImage="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80"
                                afterImage="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80&sat=-100"
                                beforeLabel="Original"
                                afterLabel="B&W"
                            />
                        </div>
                    </div>

                    <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm">
                        <h2 className="text-xl font-semibold mb-4 text-gray-200">Custom Aspect Ratio (Portrait)</h2>
                        <div className="max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                            <ImageComparisonSlider
                                beforeImage="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80"
                                afterImage="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80&sepia=100"
                                beforeLabel="Color"
                                afterLabel="Sepia"
                                className="aspect-[3/4]"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
