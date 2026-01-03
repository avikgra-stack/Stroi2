import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Statistic {
  value: string;
  label: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatarUrl?: string;
}

export interface MapMarker {
  id: number;
  x: number; // Percentage from left
  y: number; // Percentage from top
  project: {
    title: string;
    year: string;
    link: string;
    type: string;
  };
}