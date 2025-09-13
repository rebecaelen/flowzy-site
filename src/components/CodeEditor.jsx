import React from 'react'

const CodeEditor = ({ code, language, onChange }) => {
  return (
    <div style={{ padding: '20px', background: '#1e1e1e', color: 'white' }}>
      <h3>Editor Simples</h3>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', height: '200px', background: '#2d2d2d', color: 'white' }}
      />
    </div>
  )
}

export default CodeEditor