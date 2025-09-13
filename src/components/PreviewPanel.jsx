import React from 'react';
import { Paper, Typography, Box, Chip, Button } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

const PreviewPanel = ({ currentFile, code, user }) => {
  const handleRunCode = () => {
    try {
      // Simula execução do código
      console.log('▶️ Executando código:', code.substring(0, 50) + '...');
      alert('Código executado! Verifique o console do navegador.');
    } catch (error) {
      console.error('Erro ao executar:', error);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        🚀 Ações
      </Typography>
      
      <Paper elevation={3} style={{ flex: 1, padding: '15px', background: '#2d2d2d', overflow: 'auto' }}>
        
        <Button
          fullWidth
          variant="contained"
          startIcon={<PlayArrow />}
          onClick={handleRunCode}
          disabled={!currentFile}
          sx={{ mb: 2 }}
        >
          Executar Código
        </Button>

        {currentFile ? (
          <Box>
            <Chip 
              label={currentFile.type === 'file' ? '📄 Arquivo' : '📂 Pasta'} 
              color={currentFile.type === 'file' ? 'primary' : 'secondary'} 
              size="small"
              sx={{ mb: 2 }}
            />
            
            <Typography variant="body2" style={{ color: '#ccc', marginTop: '10px' }}>
              <strong>Nome:</strong> {currentFile.name}
            </Typography>
            
            <Typography variant="body2" style={{ color: '#ccc', marginTop: '5px' }}>
              <strong>Caminho:</strong> {currentFile.path}
            </Typography>
            
            {currentFile.language && (
              <Typography variant="body2" style={{ color: '#ccc', marginTop: '5px' }}>
                <strong>Linguagem:</strong> {currentFile.language}
              </Typography>
            )}
            
            <Box style={{ marginTop: '20px' }}>
              <Typography variant="caption" style={{ color: '#888' }}>
                📝 Prévia do código:
              </Typography>
              <pre style={{ 
                color: '#d4d4d4', 
                fontSize: '12px', 
                overflow: 'auto',
                margin: '10px 0',
                padding: '10px',
                background: '#252526',
                borderRadius: '4px',
                maxHeight: '150px'
              }}>
                {code.substring(0, 200)}{code.length > 200 ? '...' : ''}
              </pre>
              <Typography variant="caption" style={{ color: '#666' }}>
                {code.length} caracteres | {code.split('\n').length} linhas
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="body2" style={{ color: '#888' }}>
              👆 Selecione um arquivo
            </Typography>
            <Typography variant="caption" style={{ color: '#666', display: 'block', marginTop: '10px' }}>
              Clique em um arquivo à esquerda para começar
            </Typography>
          </Box>
        )}
      </Paper>
    </div>
  );
};

export default PreviewPanel;