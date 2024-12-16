import { useState, useEffect } from 'react';
import { BusinessReport, generateBusinessReport, getReport } from '../lib/report';
import { getOrCreateSession } from '../lib/supabase';

export function useReport() {
  const [report, setReport] = useState<BusinessReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReport = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const sessionId = await getOrCreateSession();
        let businessReport = await getReport(sessionId);

        if (!businessReport) {
          businessReport = await generateBusinessReport(sessionId);
        }

        setReport(businessReport);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load report');
      } finally {
        setIsLoading(false);
      }
    };

    loadReport();
  }, []);

  const refreshReport = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const sessionId = await getOrCreateSession();
      const businessReport = await generateBusinessReport(sessionId);
      setReport(businessReport);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh report');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    report,
    isLoading,
    error,
    refreshReport
  };
}