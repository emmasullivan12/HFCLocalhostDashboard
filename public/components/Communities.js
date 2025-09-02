// Dex last merged this code on 26th jan 2024
import React, { Component } from "react";

const communitiesList = [
  {value: '', label: '💡 Commercial & Strategic Acumen', iconFA: 'fas fa-lightbulb', isTitle: true, titleID: 'csa'},
  {value: '0', label: 'Commercial instinct (pricing, customer, product, market)', fa: 'fas fa-lightbulb', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'commercial-strategic-acumen', titleID: 'csa'},
  {value: '1', label: 'Scenario planning + forecasting', fa: 'fas fa-lightbulb', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'commercial-strategic-acumen', titleID: 'csa'},
  {value: '2', label: 'Strategic judgement (uncertainty + trade offs)', fa: 'fas fa-lightbulb', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'commercial-strategic-acumen', titleID: 'csa'},
  {value: '', label: '🚀 Growth & Capital', iconFA: 'fas fa-rocket', isTitle: true, titleID: 'gc'},
  {value: '3', label: 'Fundraising & Capital strategy', fa: 'fas fa-rocket', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'growth-and-capital', titleID: 'gc'},
  {value: '4', label: 'KPIs and unit economics', fa: 'fas fa-rocket', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'growth-and-capital', titleID: 'gc'},
  {value: '5', label: 'Investor relations + board dynamics', fa: 'fas fa-rocket', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'growth-and-capital', titleID: 'gc'},
  {value: '6', label: 'Global expansion + complex environments', fa: 'fas fa-rocket', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'growth-and-capital', titleID: 'gc'},
  {value: '7', label: 'M&A', fa: 'fas fa-rocket', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'growth-and-capital', titleID: 'gc'},
  {value: '', label: '🤖 AI-smart oversight', iconFA: 'fas fa-robot', isTitle: true, titleID: 'aiso'},
  {value: '8', label: 'AI governance + ethical guardrails', fa: 'fas fa-robot', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'ai-smart-oversight', titleID: 'aiso'},
  {value: '9', label: 'Finance tech stacks (what to use, when)', fa: 'fas fa-robot', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'ai-smart-oversight', titleID: 'aiso'},
  {value: '10', label: 'Knowing when human oversight matters', fa: 'fas fa-robot', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'ai-smart-oversight', titleID: 'aiso'},
  {value: '11', label: 'Spotting blindspots & limits of automation', fa: 'fas fa-robot', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'ai-smart-oversight', titleID: 'aiso'},
  {value: '', label: '📊 Modern Finance Workflows', iconFA: 'fas fa-chart-line', isTitle: true, titleID: 'mfw'},
  {value: '12', label: 'FP&A / Reporting', fa: 'fas fa-chart-line', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'modern-finance-workflows', titleID: 'mfw'},
  {value: '13', label: 'Budgeting & performance monitoring', fa: 'fas fa-chart-line', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'modern-finance-workflows', titleID: 'mfw'},
  {value: '14', label: 'Building AI-native workflows', fa: 'fas fa-chart-line', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'modern-finance-workflows', titleID: 'mfw'},
  {value: '15', label: 'Automation & scaling processes', fa: 'fas fa-chart-line', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'modern-finance-workflows', titleID: 'mfw'},
  {value: '', label: '👥 Leadership + influence', iconFA: 'fas fa-users', isTitle: true, titleID: 'li'},
  {value: '16', label: 'Financial storytelling', fa: 'fas fa-users', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'leadership-and-influence', titleID: 'li'},
  {value: '17', label: 'Stakeholder communication & persuasion', fa: 'fas fa-users', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'leadership-and-influence', titleID: 'li'},
  {value: '18', label: 'Cross-functional collaboration', fa: 'fas fa-users', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'leadership-and-influence', titleID: 'li'},
  {value: '19', label: 'Leading & developing teams', fa: 'fas fa-users', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'leadership-and-influence', titleID: 'li'},
  {value: '20', label: 'Navigating org crisis, change & uncertainty', fa: 'fas fa-users', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'leadership-and-influence', titleID: 'li'},
  {value: '', label: '🧭 Career Moves & Positioning', iconFA: 'fas fa-compass', isTitle: true, titleID: 'cmp'},
  {value: '21', label: 'CV / Resume strategy', fa: 'fas fa-compass', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'career-moves-and-positioning', titleID: 'cmp'},
  {value: '22', label: 'Interviews & case study prep', fa: 'fas fa-compass', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'career-moves-and-positioning', titleID: 'cmp'},
  {value: '23', label: 'Navigating recruiters & hiring managers', fa: 'fas fa-compass', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'career-moves-and-positioning', titleID: 'cmp'},
  {value: '24', label: 'Positioning yourself for strategic roles', fa: 'fas fa-compass', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'career-moves-and-positioning', titleID: 'cmp'},
  {value: '25', label: 'Pay & promotion negotiations', fa: 'fas fa-compass', checkbox: true, isTitle: false, relatedSkills:[], urlText: 'career-moves-and-positioning', titleID: 'cmp'},
];

export default communitiesList;
