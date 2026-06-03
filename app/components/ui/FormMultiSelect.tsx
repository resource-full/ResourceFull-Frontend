"use client";

import { useState } from "react";
import styles from "./FormMultiSelect.module.css";

const ChevronDown = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface MultiSelectProps {
  label: string;
  options: { value: string; label: string; icon?: string }[];
  selected: string[];
  onChange: (val: string[]) => void;
  isOpen: boolean;
  onToggle: () => void;
  enableSearch?: boolean;
  isTransparent?: boolean;
}

export default function FormMultiSelect({ 
  label, 
  options, 
  selected, 
  onChange, 
  isOpen, 
  onToggle, 
  enableSearch = false,
  isTransparent = false
}: MultiSelectProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const toggleOption = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selected.includes(val)) {
      onChange(selected.filter(v => v !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  const removeOption = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selected.filter(v => v !== val));
  };

  const filteredOptions = enableSearch 
    ? options.filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  return (
    <div className={styles.inputGroup} style={{ position: 'relative' }}>
      <button 
        type="button" 
        className={`${styles.input} ${isTransparent ? styles.transparentInput : ''}`}
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          minHeight: '50px', 
          padding: selected.length > 0 ? (isTransparent ? '8px 16px 8px 0' : '8px 16px') : (isTransparent ? '14px 16px 14px 0' : '14px 16px'), 
          height: 'auto',
          ...(isTransparent ? {
            background: 'transparent',
            border: 'none',
            outline: 'none',
            boxShadow: 'none'
          } : {})
        }}
        onClick={onToggle}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          {selected.length === 0 ? (
            <span>{label}</span>
          ) : (
            selected.map(val => {
              const opt = options.find(o => o.value === val);
              if (!opt) return null;
              return (
                <div key={val} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f0f4f8', padding: '4px 8px', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 500, color: '#11243d' }}>
                  {opt.icon && <span>{opt.icon}</span>}
                  {opt.label}
                  <div 
                    onClick={(e) => removeOption(val, e)}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: '4px', color: '#8c95a6' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 150ms ease', flexShrink: 0 }}>
          <ChevronDown />
        </span>
      </button>
      
      {isOpen && (
        <div style={{ 
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px', 
          background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', 
          padding: '8px 0', zIndex: 10, maxHeight: '250px', display: 'flex', flexDirection: 'column',
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
        }}>
          {enableSearch && (
            <div style={{ padding: '0 16px 8px 16px', borderBottom: '1px solid #e2e8f0', marginBottom: '8px' }}>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.875rem' }}
              />
            </div>
          )}
          <div style={{ overflowY: 'auto' }}>
            {filteredOptions.map(opt => (
              <div 
                key={opt.value} 
                onClick={(e) => toggleOption(opt.value, e)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', cursor: 'pointer' 
                }} 
                className={styles.menuItemHover}
              >
                <div className={`${styles.checkbox} ${selected.includes(opt.value) ? styles.checkboxActive : ''}`}>
                  {selected.includes(opt.value) && <span style={{ color: '#fff' }}><CheckIcon /></span>}
                </div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9375rem', color: '#11243d' }}>
                  {opt.icon && <span>{opt.icon}</span>}
                  {opt.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
