import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeatureShowcase } from './components/FeatureShowcase';
import { ExecutiveMetrics } from './components/ExecutiveMetrics';
import { RiskOverviewCharts } from './components/RiskOverviewCharts';
import { AccountsTable } from './components/AccountsTable';
import { AccountInvestigationDrawer } from './components/AccountInvestigationDrawer';
import { AutomationPlaybooks } from './components/AutomationPlaybooks';
import { RoiCalculator } from './components/RoiCalculator';
import { ArchitectureDocsModal } from './components/ArchitectureDocsModal';
import { Footer } from './components/Footer';
import { mockAccounts, initialRevOpsMetrics, mockAutomationPlaybooks } from './data/mockData';
import type { Account } from './types/revops';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [metrics] = useState(initialRevOpsMetrics);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);

  const handleUpdateAccount = (updated: Account) => {
    setAccounts(accounts.map((acc) => (acc.id === updated.id ? updated : acc)));
    setSelectedAccount(updated);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openDocs={() => setIsDocsOpen(true)}
      />

      <main style={{ flex: 1, maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '1rem 2rem 3rem 2rem' }}>
        {activeTab === 'home' && (
          <>
            <HeroSection
              onExploreWorkspace={() => setActiveTab('dashboard')}
              onOpenDocs={() => setIsDocsOpen(true)}
            />

            <FeatureShowcase />

            <div id="live-workspace" style={{ paddingTop: '3rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 500, color: '#f8fafc' }}>
                  Live Customer Success Workspace
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.92rem', fontWeight: 400 }}>
                  Interactive account monitoring, telemetry analytics, and automated retention playbooks.
                </p>
              </div>

              <ExecutiveMetrics metrics={metrics} />
              <RiskOverviewCharts accounts={accounts} />
              <AccountsTable
                accounts={accounts}
                onSelectAccount={(acc) => setSelectedAccount(acc)}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
          </>
        )}

        {activeTab === 'dashboard' && (
          <>
            <ExecutiveMetrics metrics={metrics} />
            <RiskOverviewCharts accounts={accounts} />
            <AccountsTable
              accounts={accounts}
              onSelectAccount={(acc) => setSelectedAccount(acc)}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </>
        )}

        {activeTab === 'accounts' && (
          <AccountsTable
            accounts={accounts}
            onSelectAccount={(acc) => setSelectedAccount(acc)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}

        {activeTab === 'playbooks' && (
          <AutomationPlaybooks playbooks={mockAutomationPlaybooks} />
        )}

        {activeTab === 'roi' && (
          <RoiCalculator />
        )}
      </main>

      <Footer
        onOpenDocs={() => setIsDocsOpen(true)}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      <AccountInvestigationDrawer
        account={selectedAccount}
        onClose={() => setSelectedAccount(null)}
        onUpdateAccount={handleUpdateAccount}
      />

      <ArchitectureDocsModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />
    </div>
  );
}

export default App;
