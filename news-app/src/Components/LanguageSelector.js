import React from 'react';
import { SelectorWrapper, LanguageButton } from '../styles/Styled-Components';

const LanguageSelector = ({ onSelect }) => (
  <SelectorWrapper>
    <LanguageButton onClick={() => onSelect('en')}>English</LanguageButton>
    <LanguageButton onClick={() => onSelect('es')}>Spanish</LanguageButton>
    <LanguageButton onClick={() => onSelect('fr')}>French</LanguageButton>
  </SelectorWrapper>
);

export default LanguageSelector;

