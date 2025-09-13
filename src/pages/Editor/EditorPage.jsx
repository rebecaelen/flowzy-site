import React, { useState } from 'react'
import { Grid, Paper, Typography, Chip, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import CodeEditor from '../../components/CodeEditor'
import FileExplorer from '../../components/FileExplorer'
import PreviewPanel from '../../components/PreviewPanel'
import useAutoSave from '../../hooks/useAutoSave'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(2),
  height: 'calc(100vh - 100px)',
  overflow: 'auto'
}))

const EditorPage = ({ user, onLogout }) => {
  const [currentFile, setCurrentFile] = useState(null)
  const [code, setCode, lastSaved] = useAutoSave('// Selecione um arquivo para começar\nconsole.log("Bem-vindo ao Flowzy!")')

  const mockFiles = [
    {
      name: 'src',
      path: '/src',
      type: 'folder',
      children: [
        {
          name: 'components',
          path: '/src/components',
          type: 'folder',
          children: [
            { name: 'App.jsx', path: '/src/components/App.jsx', type: 'file', language: 'javascript' },
            { name: 'Header.jsx', path: '/src/components/Header.jsx', type: 'file', language: 'javascript' }
          ]
        },
        { name: 'main.jsx', path: '/src/main.jsx', type: 'file', language: 'javascript' }
      ]
    }
  ]

  const handleFileSelect = (file) => {
    setCurrentFile(file)
    setCode(`// ${file.name}\n// Editando: ${file.path}\n\nfunction exemplo() {\n  return "Hello ${user?.name || 'Usuário'}!"\n}`)
  }

  return (
    <div>
      {/* Status Bar */}
      <Box sx={{ px: 2, py: 1, background: '#2d2d2d', color: 'white', display: 'flex', gap: 2 }}>
        {currentFile && (
          <Chip 
            label={`Editando: ${currentFile.name}`} 
            color="primary" 
            size="small" 
          />
        )}
        {lastSaved && (
          <Chip 
            label={`Salvo: ${lastSaved.toLocaleTimeString()}`} 
            color="success" 
            size="small" 
          />
        )}
      </Box>

      <Grid container spacing={2} sx={{ p: 2, height: 'calc(100vh - 104px)' }}>
        <Grid item xs={3}>
          <Item>
            <Typography variant="h6" gutterBottom>
              📁 Explorador
            </Typography>
            <FileExplorer files={mockFiles} onFileSelect={handleFileSelect} />
          </Item>
        </Grid>
        
        <Grid item xs={6}>
          <Item>
            <CodeEditor 
              code={code} 
              language={currentFile?.language} 
              onChange={setCode}
            />
          </Item>
        </Grid>
        
        <Grid item xs={3}>
          <Item>
            <PreviewPanel currentFile={currentFile} code={code} user={user} />
          </Item>
        </Grid>
      </Grid>
    </div>
  )
}

export default EditorPage