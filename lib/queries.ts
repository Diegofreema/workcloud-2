import { useQuery } from '@tanstack/react-query';
import { supabase } from './supabase';
import { Organization, connections } from '../constants/types';

export const useFollowers = () => {
  const getFollowers = async () => {
    const { data, error } = await supabase
      .from('profile')
      .select('connections')
      .order('connections', { ascending: false });

    return {
      connections: data as connections,
      error,
    };
  };
  return useQuery({
    queryKey: ['connections'],
    queryFn: async () => getFollowers(),
  });
};
export const useOrgs = () => {
  const getOrgs = async () => {
    const { data, error } = await supabase.from('workspace').select();

    return {
      orgs: data as Organization[],
      error,
    };
  };
  return useQuery({
    queryKey: ['organizations'],
    queryFn: async () => getOrgs(),
  });
};
