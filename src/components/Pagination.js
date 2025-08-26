import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {commonStyles} from '../styles/common';

const Pagination = ({currentPage, totalPages, onPageChange}) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <TouchableOpacity
          key={i}
          style={[
            commonStyles.button,
            currentPage === i && {backgroundColor: '#0056b3'},
            {marginHorizontal: 4, padding: 8, minWidth: 40},
          ]}
          onPress={() => onPageChange(i)}>
          <Text style={commonStyles.buttonText}>{i}</Text>
        </TouchableOpacity>,
      );
    }

    return pages;
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16,
      }}>
      <TouchableOpacity
        style={[commonStyles.button, {marginHorizontal: 4, padding: 8}]}
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        <Text style={commonStyles.buttonText}>Previous</Text>
      </TouchableOpacity>

      {renderPageNumbers()}

      <TouchableOpacity
        style={[commonStyles.button, {marginHorizontal: 4, padding: 8}]}
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        <Text style={commonStyles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;
