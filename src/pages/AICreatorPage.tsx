import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDesignSystemStore } from '@/store/design-system-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Wand2, Sparkles, Send, X, Palette, Type, Loader2 } from 'lucide-react'

export function AICreatorPage() {
  const navigate = useNavigate()
  const { initializeDesignSystem, addColorToken, addTypographyToken } = useDesignSystemStore()
  const [brandName, setBrandName] = useState('')
  const [description, setDescription] = useState('')
  const [style, setStyle] = useState('modern')
  const [colorPalette, setColorPalette] = useState('blue')
  const [vibe, setVibe] = useState('professional')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState('')

  // Color palette definitions based on selection
  const colorPalettes: Record<string, Array<{ name: string; value: string; description?: string }>> = {
    blue: [
      { name: 'Primary Blue', value: '#3B82F6', description: 'Main brand color' },
      { name: 'Blue 50', value: '#EFF6FF', description: 'Lightest blue' },
      { name: 'Blue 100', value: '#DBEAFE', description: 'Very light blue' },
      { name: 'Blue 500', value: '#3B82F6', description: 'Medium blue' },
      { name: 'Blue 700', value: '#1D4ED8', description: 'Dark blue' },
      { name: 'Blue 900', value: '#1E3A8A', description: 'Darkest blue' },
    ],
    green: [
      { name: 'Primary Green', value: '#10B981', description: 'Main brand color' },
      { name: 'Green 50', value: '#ECFDF5', description: 'Lightest green' },
      { name: 'Green 100', value: '#D1FAE5', description: 'Very light green' },
      { name: 'Green 500', value: '#10B981', description: 'Medium green' },
      { name: 'Green 700', value: '#047857', description: 'Dark green' },
      { name: 'Green 900', value: '#064E3B', description: 'Darkest green' },
    ],
    purple: [
      { name: 'Primary Purple', value: '#8B5CF6', description: 'Main brand color' },
      { name: 'Purple 50', value: '#FAF5FF', description: 'Lightest purple' },
      { name: 'Purple 100', value: '#F3E8FF', description: 'Very light purple' },
      { name: 'Purple 500', value: '#8B5CF6', description: 'Medium purple' },
      { name: 'Purple 700', value: '#6D28D9', description: 'Dark purple' },
      { name: 'Purple 900', value: '#4C1D95', description: 'Darkest purple' },
    ],
    red: [
      { name: 'Primary Red', value: '#EF4444', description: 'Main brand color' },
      { name: 'Red 50', value: '#FEF2F2', description: 'Lightest red' },
      { name: 'Red 100', value: '#FEE2E2', description: 'Very light red' },
      { name: 'Red 500', value: '#EF4444', description: 'Medium red' },
      { name: 'Red 700', value: '#B91C1C', description: 'Dark red' },
      { name: 'Red 900', value: '#7F1D1D', description: 'Darkest red' },
    ],
    orange: [
      { name: 'Primary Orange', value: '#F97316', description: 'Main brand color' },
      { name: 'Orange 50', value: '#FFF7ED', description: 'Lightest orange' },
      { name: 'Orange 100', value: '#FFEDD5', description: 'Very light orange' },
      { name: 'Orange 500', value: '#F97316', description: 'Medium orange' },
      { name: 'Orange 700', value: '#C2410C', description: 'Dark orange' },
      { name: 'Orange 900', value: '#7C2D12', description: 'Darkest orange' },
    ],
    neutral: [
      { name: 'Primary Gray', value: '#6B7280', description: 'Main neutral color' },
      { name: 'Gray 50', value: '#F9FAFB', description: 'Lightest gray' },
      { name: 'Gray 100', value: '#F3F4F6', description: 'Very light gray' },
      { name: 'Gray 500', value: '#6B7280', description: 'Medium gray' },
      { name: 'Gray 700', value: '#374151', description: 'Dark gray' },
      { name: 'Gray 900', value: '#111827', description: 'Darkest gray' },
    ],
    warm: [
      { name: 'Primary Warm', value: '#EA580C', description: 'Main warm color' },
      { name: 'Amber 50', value: '#FFFBEB', description: 'Light warm tone' },
      { name: 'Orange 200', value: '#FED7AA', description: 'Warm accent' },
      { name: 'Orange 600', value: '#EA580C', description: 'Medium warm' },
      { name: 'Red 700', value: '#B91C1C', description: 'Dark warm' },
      { name: 'Red 900', value: '#7F1D1D', description: 'Darkest warm' },
    ],
    cool: [
      { name: 'Primary Cool', value: '#0EA5E9', description: 'Main cool color' },
      { name: 'Sky 50', value: '#F0F9FF', description: 'Light cool tone' },
      { name: 'Cyan 200', value: '#A5F3FC', description: 'Cool accent' },
      { name: 'Sky 500', value: '#0EA5E9', description: 'Medium cool' },
      { name: 'Blue 700', value: '#1D4ED8', description: 'Dark cool' },
      { name: 'Indigo 900', value: '#312E81', description: 'Darkest cool' },
    ],
  }

  const typographyScales = [
    { name: 'Display', fontSize: '72px', lineHeight: '1.1', fontWeight: '700', description: 'Hero headlines' },
    { name: 'H1', fontSize: '48px', lineHeight: '1.2', fontWeight: '700', description: 'Page title' },
    { name: 'H2', fontSize: '36px', lineHeight: '1.3', fontWeight: '600', description: 'Section heading' },
    { name: 'H3', fontSize: '30px', lineHeight: '1.4', fontWeight: '600', description: 'Subsection heading' },
    { name: 'H4', fontSize: '24px', lineHeight: '1.4', fontWeight: '600', description: 'Card title' },
    { name: 'Body Large', fontSize: '18px', lineHeight: '1.6', fontWeight: '400', description: 'Large body text' },
    { name: 'Body', fontSize: '16px', lineHeight: '1.6', fontWeight: '400', description: 'Default body text' },
    { name: 'Body Small', fontSize: '14px', lineHeight: '1.5', fontWeight: '400', description: 'Small body text' },
    { name: 'Caption', fontSize: '12px', lineHeight: '1.4', fontWeight: '400', description: 'Fine print' },
  ]

  const handleGenerate = async () => {
    setIsGenerating(true)
    
    // Step 1: Initialize design system
    setGenerationStep('Creating design system...')
    await new Promise(resolve => setTimeout(resolve, 800))
    initializeDesignSystem(brandName, description)
    
    // Step 2: Generate colors
    setGenerationStep('Generating color palette...')
    await new Promise(resolve => setTimeout(resolve, 1000))
    const colors = colorPalettes[colorPalette] || colorPalettes.blue
    colors.forEach(color => {
      addColorToken(color)
    })
    
    // Step 3: Generate typography
    setGenerationStep('Creating typography scale...')
    await new Promise(resolve => setTimeout(resolve, 800))
    typographyScales.forEach(typo => {
      addTypographyToken(typo)
    })
    
    // Step 4: Finalize
    setGenerationStep('Finalizing design system...')
    await new Promise(resolve => setTimeout(resolve, 600))
    
    setIsGenerating(false)
    navigate('/creator/overview')
  }

  const handleCancel = () => {
    navigate('/creator')
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Generate with AI</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tell us about your brand and we'll create your design system
          </p>
        </div>
        <Button variant="ghost" onClick={handleCancel}>
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </div>

      {/* Help Text */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-primary mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">AI Generation Tips</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Be specific about your brand's personality and target audience</li>
                <li>• Mention any existing brand colors or style guidelines</li>
                <li>• Include examples of brands or designs you admire</li>
                <li>• The more context you provide, the better the results</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Chat-like Interface */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Wand2 className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">Tell us about your brand</CardTitle>
              <CardDescription className="text-xs">
                The more details you provide, the better your design system will be
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Brand Name */}
          <div className="space-y-2">
            <Label htmlFor="brand-name">Brand Name</Label>
            <Input
              id="brand-name"
              placeholder="e.g., Acme Corporation"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Brand Description</Label>
            <textarea
              id="description"
              placeholder="Tell us about your brand, products, target audience, and what makes you unique..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          {/* Style Selection */}
          <div className="space-y-2">
            <Label htmlFor="style">Design Style</Label>
            <select
              id="style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="modern">Modern & Minimal</option>
              <option value="bold">Bold & Vibrant</option>
              <option value="elegant">Elegant & Sophisticated</option>
              <option value="playful">Playful & Fun</option>
              <option value="corporate">Corporate & Professional</option>
              <option value="tech">Tech & Futuristic</option>
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Color Palette */}
            <div className="space-y-2">
              <Label htmlFor="color-palette">Color Palette Base</Label>
              <select
                id="color-palette"
                value={colorPalette}
                onChange={(e) => setColorPalette(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="blue">Blue Tones</option>
                <option value="green">Green Tones</option>
                <option value="purple">Purple Tones</option>
                <option value="red">Red Tones</option>
                <option value="orange">Orange Tones</option>
                <option value="neutral">Neutral Grays</option>
                <option value="warm">Warm Colors</option>
                <option value="cool">Cool Colors</option>
              </select>
            </div>

            {/* Vibe */}
            <div className="space-y-2">
              <Label htmlFor="vibe">Overall Vibe</Label>
              <select
                id="vibe"
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly & Approachable</option>
                <option value="luxury">Luxury & Premium</option>
                <option value="energetic">Energetic & Dynamic</option>
                <option value="calm">Calm & Serene</option>
                <option value="innovative">Innovative & Cutting-edge</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isGenerating && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="py-8">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-8 w-8 animate-pulse text-primary" />
                </div>
                <Loader2 className="absolute -right-1 -top-1 h-6 w-6 animate-spin text-primary" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold">Generating your design system...</p>
                <p className="text-sm text-muted-foreground">{generationStep}</p>
              </div>
              <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <span>Color Palette</span>
                </div>
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  <span>Typography</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4" />
                  <span>Components</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button 
          size="lg"
          onClick={handleGenerate}
          disabled={!brandName || !description || isGenerating}
        >
          {isGenerating ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
              Generating...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Generate Design System
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
