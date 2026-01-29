import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Upload,
  FileCode,
  Github,
  Link as LinkIcon,
  Sparkles,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Code,
  Palette,
  Type,
  Box,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type UploadMethod = 'file' | 'github' | 'url' | null
type ProcessingStep = 'uploading' | 'analyzing' | 'extracting' | 'generating' | 'complete'

export function ImportCodePage() {
  const navigate = useNavigate()
  const [selectedMethod, setSelectedMethod] = useState<UploadMethod>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState<ProcessingStep>('uploading')
  const [githubUrl, setGithubUrl] = useState('')
  const [projectName, setProjectName] = useState('')

  const uploadMethods = [
    {
      id: 'file' as UploadMethod,
      icon: FileCode,
      title: 'Upload Files',
      description: 'Upload component files, CSS, or entire project folders',
      formats: 'React, Vue, Svelte, HTML/CSS',
    },
    {
      id: 'github' as UploadMethod,
      icon: Github,
      title: 'GitHub Repository',
      description: 'Connect your GitHub repo for automatic extraction',
      formats: 'Public & Private repos',
    },
    {
      id: 'url' as UploadMethod,
      icon: LinkIcon,
      title: 'URL Import',
      description: 'Import from a live website or design system URL',
      formats: 'Any public website',
    },
  ]

  const processingSteps = [
    { id: 'uploading', label: 'Uploading code', icon: Upload },
    { id: 'analyzing', label: 'Analyzing structure', icon: Code },
    { id: 'extracting', label: 'Extracting tokens', icon: Sparkles },
    { id: 'generating', label: 'Generating system', icon: Box },
    { id: 'complete', label: 'Complete', icon: CheckCircle2 },
  ]

  const handleImport = async () => {
    setIsProcessing(true)
    
    // Simulate processing steps
    const steps: ProcessingStep[] = ['uploading', 'analyzing', 'extracting', 'generating', 'complete']
    
    for (const step of steps) {
      setCurrentStep(step)
      await new Promise(resolve => setTimeout(resolve, 1500))
    }

    // Navigate to creator with imported data
    setTimeout(() => {
      navigate('/creator/overview?imported=true')
    }, 1000)
  }

  const currentStepIndex = processingSteps.findIndex((s) => s.id === currentStep)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Import from Code</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Transform your existing codebase into a structured design system
        </p>
      </div>

      {!isProcessing ? (
        <>
          {/* Upload Method Selection */}
          <div className="grid gap-6 md:grid-cols-3">
            {uploadMethods.map((method) => (
              <Card
                key={method.id}
                className={cn(
                  'cursor-pointer border transition-colors hover:border-primary',
                  selectedMethod === method.id
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary/50'
                )}
                onClick={() => setSelectedMethod(method.id)}
              >
                <CardHeader>
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <method.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">{method.formats}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upload Form */}
          {selectedMethod && (
            <Card>
              <CardHeader>
                <CardTitle>Configure Import</CardTitle>
                <CardDescription>
                  Provide details about your code to import
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="e.g., Acme Design System"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>

                {selectedMethod === 'file' && (
                  <div className="space-y-2">
                    <Label>Upload Files</Label>
                    <div className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed transition-colors hover:border-primary hover:bg-primary/5">
                      <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
                      <p className="font-medium">Click to upload or drag and drop</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        .jsx, .tsx, .vue, .svelte, .css files or ZIP folder
                      </p>
                      <Button variant="outline" className="mt-4">
                        Browse Files
                      </Button>
                    </div>
                  </div>
                )}

                {selectedMethod === 'github' && (
                  <div className="space-y-2">
                    <Label htmlFor="github-url">GitHub Repository URL</Label>
                    <Input
                      id="github-url"
                      placeholder="https://github.com/username/repository"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Make sure the repository is public or grant access
                    </p>
                  </div>
                )}

                {selectedMethod === 'url' && (
                  <div className="space-y-2">
                    <Label htmlFor="website-url">Website URL</Label>
                    <Input
                      id="website-url"
                      placeholder="https://example.com"
                    />
                    <p className="text-sm text-muted-foreground">
                      We'll analyze the live site and extract design tokens
                    </p>
                  </div>
                )}

                <div className="rounded-lg border bg-muted/50 p-4">
                  <h4 className="mb-2 font-semibold">What we'll extract:</h4>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Palette className="h-4 w-4 text-primary" />
                      Color palette & tokens
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Type className="h-4 w-4 text-primary" />
                      Typography scale
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Box className="h-4 w-4 text-primary" />
                      Component structure
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Spacing & layout tokens
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setSelectedMethod(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleImport} disabled={!projectName}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Start Import
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Sparkles className="mb-2 h-8 w-8 text-primary" />
                <CardTitle className="text-lg">AI-Powered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our AI automatically identifies patterns, extracts tokens, and
                  organizes your design system intelligently.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Code className="mb-2 h-8 w-8 text-primary" />
                <CardTitle className="text-lg">Multi-Framework</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Supports React, Vue, Svelte, and plain HTML/CSS. Works with any
                  modern frontend framework.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle2 className="mb-2 h-8 w-8 text-primary" />
                <CardTitle className="text-lg">Editable Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Review and refine extracted tokens. Add descriptions, organize,
                  and customize everything.
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        /* Processing View */
        <Card>
          <CardContent className="flex min-h-[500px] flex-col items-center justify-center p-12">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold">
                {currentStep === 'complete'
                  ? 'Import Complete!'
                  : 'Processing your code...'}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {currentStep === 'complete'
                  ? 'Your design system is ready'
                  : 'This may take a few moments'}
              </p>
            </div>

            <div className="w-full max-w-md space-y-4">
              {processingSteps.map((step, index) => {
                const isActive = step.id === currentStep
                const isComplete = index < currentStepIndex
                const StepIcon = step.icon

                return (
                  <div
                    key={step.id}
                    className={cn(
                      'flex items-center gap-4 rounded-lg border p-4 transition-all',
                      isActive && 'border-primary bg-primary/5',
                      isComplete && 'border-green-500/20 bg-green-500/5'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full',
                        isActive && 'bg-primary text-primary-foreground',
                        isComplete && 'bg-green-500 text-white',
                        !isActive && !isComplete && 'bg-muted text-muted-foreground'
                      )}
                    >
                      {isActive ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <StepIcon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{step.label}</p>
                    </div>
                    {isComplete && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                )
              })}
            </div>

            {currentStep === 'complete' && (
              <div className="mt-8">
                <Button size="lg" onClick={() => navigate('/creator/overview')}>
                  View Design System
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
