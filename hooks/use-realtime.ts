import { useEffect, useState } from 'react';
import { supabase } from '@/lib/auth';

export function useRealtime(table: string) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Initial fetch
    const fetchData = async () => {
      const { data: initialData } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });
      
      if (initialData) {
        setData(initialData);
      }
    };

    fetchData();

    // Set up real-time subscription
    const subscription = supabase
      .channel(`${table}_channel`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table },
        (payload) => {
          // Update data based on the change
          if (payload.eventType === 'INSERT') {
            setData((current) => [payload.new, ...current]);
          } else if (payload.eventType === 'DELETE') {
            setData((current) => 
              current.filter((item) => item.id !== payload.old.id)
            );
          } else if (payload.eventType === 'UPDATE') {
            setData((current) =>
              current.map((item) =>
                item.id === payload.new.id ? payload.new : item
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [table]);

  return data;
}