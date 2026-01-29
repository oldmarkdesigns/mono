import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { AppLayout } from '@/components/layout/AppLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { ImportCodePage } from '@/pages/ImportCodePage'
import { CreatorLandingPage } from '@/pages/CreatorLandingPage'
import { AICreatorPage } from '@/pages/AICreatorPage'
import { OverviewPage } from '@/pages/OverviewPage'
import { ColorsPage } from '@/pages/ColorsPage'
import { TypographyPage } from '@/pages/TypographyPage'
import { ButtonsPage } from '@/pages/ButtonsPage'
import { ComponentsPage } from '@/pages/ComponentsPage'
import { GuidelinesPage } from '@/pages/GuidelinesPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { HelpPage } from '@/pages/HelpPage'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="mockman-ui-theme">
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/import" element={<ImportCodePage />} />
            <Route path="/creator" element={<CreatorLandingPage />} />
            <Route path="/creator/ai" element={<AICreatorPage />} />
            <Route path="/creator/overview" element={<OverviewPage />} />
            <Route path="/creator/colors" element={<ColorsPage />} />
            <Route path="/creator/typography" element={<TypographyPage />} />
            <Route path="/creator/buttons" element={<ButtonsPage />} />
            <Route path="/creator/components" element={<ComponentsPage />} />
            <Route path="/creator/guidelines" element={<GuidelinesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/settings/profile" element={<SettingsPage />} />
            <Route path="/settings/billing" element={<SettingsPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
