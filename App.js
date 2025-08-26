import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import UserList from './src/components/UserList';
import Loading from './src/components/Loading';
import Error from './src/components/Error';
import {UserProvider, useUser} from './src/context/UserContext';
import {getUsers} from './src/services/api';
import useApi from './src/hooks/useApi';

const AppContent = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {state, actions} = useUser();
  const {loading, error, currentPage, usersPerPage} = state;

  const {execute: fetchUsersApi} = useApi();

  useEffect(() => {
    loadUsers();
  }, [currentPage]);

  const loadUsers = async () => {
    try {
      actions.setLoading(true);
      const result = await fetchUsersApi(getUsers, currentPage, usersPerPage);
      actions.setUsers(result.data);
      actions.setTotalCount(result.totalCount);
    } catch (err) {
      actions.setError(err.message);
    }
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  if (loading && state.users.length === 0) {
    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Loading />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Error message={error} onRetry={loadUsers} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{flex: 1}}>
        <UserList />
      </View>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;
