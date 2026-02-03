import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { 
  Palette, 
  Type, 
  MousePointer2, 
  Square, 
  Table2, 
  Layout, 
  Image as ImageIcon,
  Grid3x3,
  Info,
  Layers,
  Sparkles,
  FileText,
  Map,
  Play
} from 'lucide-react';
import './styles/design-system.css';

// Componentes individuales del Design System
import ColorPalette from './components/design-system/ColorPalette';
import Typography from './components/design-system/Typography';
import Buttons from './components/design-system/Buttons';
import FormElements from './components/design-system/FormElements';
import Cards from './components/design-system/Cards';
import Tables from './components/design-system/Tables';
import Modals from './components/design-system/Modals';
import Badges from './components/design-system/Badges';
import Icons from './components/design-system/Icons';
import Spacing from './components/design-system/Spacing';
import Overview from './components/design-system/Overview';
import Wireframes from './components/design-system/Wireframes';
import HighFidelity from './components/design-system/HighFidelity';
import Documentation from './components/design-system/Documentation';
import Architecture from './components/design-system/Architecture';
import Prototype from './components/design-system/Prototype';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div style={{ 
      fontFamily: 'var(--font-primary)', 
      background: 'var(--color-neutral-100)',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <header style={{
        background: 'var(--color-neutral-50)',
        borderBottom: '1px solid var(--color-neutral-300)',
        padding: '32px 40px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-neutral-900)',
            margin: 0,
            marginBottom: '8px'
          }}>
            Proyecto Intermodular - Panadería Artesanal
          </h1>
          <p style={{
            fontSize: 'var(--font-size-body-m)',
            color: 'var(--color-neutral-700)',
            margin: 0
          }}>
            Design System completo v1.0.0 | Sprint de Diseño Visual
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '40px'
      }}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Tabs Navigation - Always visible at top */}
          <TabsList style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '8px',
            background: 'var(--color-neutral-50)',
            padding: '8px',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '32px',
            border: '1px solid var(--color-neutral-300)',
            zIndex: 40
          }}>
            <TabsTrigger value="overview" style={{ gap: '8px' }}>
              <Info size={16} />
              <span className="hidden sm:inline">Resumen</span>
            </TabsTrigger>
            <TabsTrigger value="colors" style={{ gap: '8px' }}>
              <Palette size={16} />
              <span className="hidden sm:inline">Colores</span>
            </TabsTrigger>
            <TabsTrigger value="typography" style={{ gap: '8px' }}>
              <Type size={16} />
              <span className="hidden sm:inline">Tipografía</span>
            </TabsTrigger>
            <TabsTrigger value="buttons" style={{ gap: '8px' }}>
              <MousePointer2 size={16} />
              <span className="hidden sm:inline">Botones</span>
            </TabsTrigger>
            <TabsTrigger value="forms" style={{ gap: '8px' }}>
              <Square size={16} />
              <span className="hidden sm:inline">Formularios</span>
            </TabsTrigger>
            <TabsTrigger value="cards" style={{ gap: '8px' }}>
              <Layout size={16} />
              <span className="hidden sm:inline">Tarjetas</span>
            </TabsTrigger>
            <TabsTrigger value="tables" style={{ gap: '8px' }}>
              <Table2 size={16} />
              <span className="hidden sm:inline">Tablas</span>
            </TabsTrigger>
            <TabsTrigger value="modals" style={{ gap: '8px' }}>
              <Square size={16} />
              <span className="hidden sm:inline">Modales</span>
            </TabsTrigger>
            <TabsTrigger value="badges" style={{ gap: '8px' }}>
              <Square size={16} />
              <span className="hidden sm:inline">Badges</span>
            </TabsTrigger>
            <TabsTrigger value="icons" style={{ gap: '8px' }}>
              <ImageIcon size={16} />
              <span className="hidden sm:inline">Iconos</span>
            </TabsTrigger>
            <TabsTrigger value="spacing" style={{ gap: '8px' }}>
              <Grid3x3 size={16} />
              <span className="hidden sm:inline">Espaciado</span>
            </TabsTrigger>
            <TabsTrigger value="wireframes" style={{ gap: '8px' }}>
              <Layers size={16} />
              <span className="hidden sm:inline">Wireframes</span>
            </TabsTrigger>
            <TabsTrigger value="high-fidelity" style={{ gap: '8px' }}>
              <Sparkles size={16} />
              <span className="hidden sm:inline">High Fidelity</span>
            </TabsTrigger>
            <TabsTrigger value="documentation" style={{ gap: '8px' }}>
              <FileText size={16} />
              <span className="hidden sm:inline">Documentación</span>
            </TabsTrigger>
            <TabsTrigger value="architecture" style={{ gap: '8px' }}>
              <Map size={16} />
              <span className="hidden sm:inline">Arquitectura</span>
            </TabsTrigger>
            <TabsTrigger value="prototype" style={{ gap: '8px' }}>
              <Play size={16} />
              <span className="hidden sm:inline">Prototipo</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Overview />
          </TabsContent>

          <TabsContent value="colors">
            <ColorPalette />
          </TabsContent>

          <TabsContent value="typography">
            <Typography />
          </TabsContent>

          <TabsContent value="buttons">
            <Buttons />
          </TabsContent>

          <TabsContent value="forms">
            <FormElements />
          </TabsContent>

          <TabsContent value="cards">
            <Cards />
          </TabsContent>

          <TabsContent value="tables">
            <Tables />
          </TabsContent>

          <TabsContent value="modals">
            <Modals />
          </TabsContent>

          <TabsContent value="badges">
            <Badges />
          </TabsContent>

          <TabsContent value="icons">
            <Icons />
          </TabsContent>

          <TabsContent value="spacing">
            <Spacing />
          </TabsContent>

          <TabsContent value="wireframes">
            <Wireframes />
          </TabsContent>

          <TabsContent value="high-fidelity">
            <HighFidelity />
          </TabsContent>

          <TabsContent value="documentation">
            <Documentation />
          </TabsContent>

          <TabsContent value="architecture">
            <Architecture />
          </TabsContent>

          <TabsContent value="prototype">
            <Prototype />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}