import React from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import UserStack from './userStack';
import AuthStack from './authStack';
import LoadingScreen from '../screens/LoadingScreen';

export default function RootNavigation() {
  const { user, isLoading } = useAuthentication();
  if (isLoading) return <LoadingScreen nextScreen={null} />
  else return user ? <UserStack /> : <AuthStack />;
}
