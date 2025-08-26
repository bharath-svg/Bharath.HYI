import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  StyleSheet,
} from 'react-native';
import {commonStyles} from '../styles/common';
import UserForm from './UserForm';
import Pagination from './Pagination';
import {useUser} from '../context/UserContext';

const UserList = () => {
  const {state, actions} = useUser();
  const {users, loading, currentPage, totalCount, usersPerPage} = state;

  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const totalPages = Math.ceil(totalCount / usersPerPage);

  const handleEdit = user => {
    setSelectedUser(user);
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleDelete = user => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete ${user.name}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: () => actions.deleteUser(user.id),
          style: 'destructive',
        },
      ],
    );
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setModalVisible(true);
  };

  const handleSubmit = userData => {
    if (isEditing) {
      actions.updateUser({...userData, id: selectedUser.id});
    } else {
      actions.addUser({...userData, id: Date.now()});
    }
    setModalVisible(false);
  };

  const handlePageChange = page => {
    actions.setCurrentPage(page);
    // Fetch users for new page if API supports
  };

  const renderUserItem = ({item}) => (
    <View style={commonStyles.card}>
      <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
      <Text>{item.email}</Text>
      <Text>{item.phone}</Text>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[commonStyles.button, styles.editButton]}
          onPress={() => handleEdit(item)}>
          <Text style={commonStyles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[commonStyles.button, styles.deleteButton]}
          onPress={() => handleDelete(item)}>
          <Text style={commonStyles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={commonStyles.container}>
      <TouchableOpacity style={commonStyles.button} onPress={handleAdd}>
        <Text style={commonStyles.buttonText}>Add New User</Text>
      </TouchableOpacity>

      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={item => item.id.toString()}
        refreshing={loading}
        onRefresh={() => {}}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Replace BottomSheet with Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <UserForm
              user={selectedUser}
              onSubmit={handleSubmit}
              onCancel={() => setModalVisible(false)}
              isEditing={isEditing}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    padding: 8,
    marginRight: 8,
    backgroundColor: '#28a745',
  },
  deleteButton: {
    padding: 8,
    backgroundColor: '#dc3545',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
});

export default UserList;
