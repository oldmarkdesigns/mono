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
import { PlaceholderPage } from '@/pages/PlaceholderPage'

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
            <Route
              path="/analytics"
              element={
                <PlaceholderPage
                  title="Analytics"
                  description="Track design system usage, adoption trends, and team activity."
                />
              }
            />
            <Route
              path="/portal"
              element={
                <PlaceholderPage
                  title="Portal"
                  description="Publish and share your design system with consumers."
                />
              }
            />
            <Route
              path="/assets"
              element={
                <PlaceholderPage
                  title="Assets"
                  description="Manage icons, illustrations, and brand files in one place."
                />
              }
            />
            <Route
              path="/storybook-stories"
              element={
                <PlaceholderPage
                  title="Storybook Stories"
                  description="Browse and organize component stories for your system."
                />
              }
            />
            <Route
              path="/data-sources"
              element={
                <PlaceholderPage
                  title="Data Sources"
                  description="Connect and manage external systems that feed design data."
                />
              }
            />
            <Route
              path="/notifications"
              element={
                <PlaceholderPage
                  title="Notifications"
                  description="Review updates, alerts, and collaboration events."
                />
              }
            />
            <Route
              path="/search"
              element={
                <PlaceholderPage
                  title="Search"
                  description="Search across tokens, components, docs, and workspace content."
                />
              }
            />
            <Route
              path="/invite-team"
              element={
                <PlaceholderPage
                  title="Invite Team"
                  description="Add teammates and manage workspace access."
                />
              }
            />
            <Route
              path="/support"
              element={
                <PlaceholderPage
                  title="Contact Support"
                  description="Get in touch with support for product and technical issues."
                />
              }
            />
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
