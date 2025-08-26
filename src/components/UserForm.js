import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {commonStyles} from '../styles/common';
import {validateUser} from '../utils/validation';

const UserForm = ({user, onSubmit, onCancel, isEditing}) => {
  const [formData, setFormData] = useState(
    user || {
      name: '',
      email: '',
      phone: '',
      username: '',
      website: '',
    },
  );
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({...formData, [field]: value});

    if (errors[field]) {
      setErrors({...errors, [field]: ''});
    }
  };

  const handleSubmit = () => {
    const validation = validateUser(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <ScrollView style={{padding: 16}}>
      <TextInput
        style={[commonStyles.input, errors.name && {borderColor: 'red'}]}
        placeholder="Name"
        value={formData.name}
        onChangeText={text => handleChange('name', text)}
      />
      {errors.name && <Text style={commonStyles.errorText}>{errors.name}</Text>}

      <TextInput
        style={[commonStyles.input, errors.email && {borderColor: 'red'}]}
        placeholder="Email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={text => handleChange('email', text)}
      />
      {errors.email && (
        <Text style={commonStyles.errorText}>{errors.email}</Text>
      )}

      <TextInput
        style={[commonStyles.input, errors.phone && {borderColor: 'red'}]}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={text => handleChange('phone', text)}
      />
      {errors.phone && (
        <Text style={commonStyles.errorText}>{errors.phone}</Text>
      )}

      <TextInput
        style={[commonStyles.input, errors.username && {borderColor: 'red'}]}
        placeholder="Username"
        value={formData.username}
        onChangeText={text => handleChange('username', text)}
      />
      {errors.username && (
        <Text style={commonStyles.errorText}>{errors.username}</Text>
      )}

      <TextInput
        style={commonStyles.input}
        placeholder="Website"
        value={formData.website}
        onChangeText={text => handleChange('website', text)}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={[
            commonStyles.button,
            {flex: 1, marginRight: 8, backgroundColor: '#6c757d'},
          ]}
          onPress={onCancel}>
          <Text style={commonStyles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[commonStyles.button, {flex: 1}]}
          onPress={handleSubmit}>
          <Text style={commonStyles.buttonText}>
            {isEditing ? 'Update' : 'Create'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserForm;
