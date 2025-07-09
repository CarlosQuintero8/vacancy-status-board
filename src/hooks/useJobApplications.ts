
import { useState, useEffect } from 'react';
import { JobApplication } from '@/types/job';

const STORAGE_KEY = 'jobfollower-applications';

export const useJobApplications = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setApplications(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing stored applications:', error);
      }
    }
  }, []);

  const saveApplications = (newApplications: JobApplication[]) => {
    setApplications(newApplications);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newApplications));
  };

  const addApplication = (application: Omit<JobApplication, 'id' | 'createdAt'>) => {
    const newApplication: JobApplication = {
      ...application,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const newApplications = [...applications, newApplication];
    saveApplications(newApplications);
  };

  const updateApplication = (id: string, updates: Partial<JobApplication>) => {
    const newApplications = applications.map(app =>
      app.id === id ? { ...app, ...updates } : app
    );
    saveApplications(newApplications);
  };

  const deleteApplication = (id: string) => {
    const newApplications = applications.filter(app => app.id !== id);
    saveApplications(newApplications);
  };

  return {
    applications,
    addApplication,
    updateApplication,
    deleteApplication,
  };
};
