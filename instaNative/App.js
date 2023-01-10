import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './contexts/AuthContext';
import Navigation from './navigations/Navigation';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigation/>
      </AuthProvider>
    </NavigationContainer>
  );
}
