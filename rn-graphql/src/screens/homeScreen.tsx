/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
import {useMutation, useQuery} from '@apollo/client';
import React from 'react';
import styled from 'styled-components/native';
import images from '../assets/images';
import {Alert, TouchableOpacity} from 'react-native';
import {DELETE_RECIPE, GET_RECIPES} from '../queries/queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

const HomeScreen = (props: any) => {
  const {navigation} = props;
  const {loading, error, data, refetch} = useQuery(GET_RECIPES);
  const [deleteRecipe] = useMutation(DELETE_RECIPE);

  if (loading) {
    return (
      <Container>
        <NoDataView>
          <NoDataText>Loading...</NoDataText>
        </NoDataView>
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <NoDataView>
          <NoDataText>Error: {error.message}</NoDataText>
        </NoDataView>
      </Container>
    );
  }

  const handleDelete = async (itemId: string) => {
    try {
      const {
        data: {deleteRecipe: isDeleted},
      } = await deleteRecipe({
        variables: {ID: itemId},
      });

      if (isDeleted) {
        Alert.alert('GraphQL', 'Data deleted successful');
        refetch();
      } else {
        console.error('Error deleting recipe');
      }
    } catch (error) {
      console.error('Error deleting recipe:', error.message);
    }
  };

  const _logout = async () => {
    await AsyncStorage.removeItem('@user_data');
    goToLoginPage();
  };

  const goToLoginPage = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
          },
        ],
      }),
    );
  };

  return (
    <Container>
      <LogoutButton onPress={() => _logout()}>
        <LogoutIcon source={images.logout} resizeMode={'contain'} />
      </LogoutButton>
      {data.getRecipes.length > 0 ? (
        <ListContainer
          data={data.getRecipes}
          keyExtractor={(item: any, index: number) => index.toString()}
          renderItem={({item}: any) => (
            <ItemContainer>
              <ItemView>
                <InfoView>
                  <Name>Name: {item.name}</Name>
                  {item.description && (
                    <Description>Description: {item.description}</Description>
                  )}
                  {item.createAt && (
                    <CreatedAt>Created At: {item.createAt}</CreatedAt>
                  )}
                </InfoView>
                <ButtonView>
                  <TouchableOpacity onPress={() => handleDelete(item._id)}>
                    <DeleteIcon source={images.delete} resizeMode={'contain'} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('AddRecipe', {
                        item: item,
                        refetch: refetch,
                      })
                    }>
                    <EditIcon source={images.edit} resizeMode={'contain'} />
                  </TouchableOpacity>
                </ButtonView>
              </ItemView>
              <BottomLine />
            </ItemContainer>
          )}
        />
      ) : (
        <NoDataView>
          <NoDataText>Data is not available</NoDataText>
        </NoDataView>
      )}
      <AddButton
        onPress={() => navigation.navigate('AddRecipe', {refetch: refetch})}>
        <AddText>Add Data</AddText>
      </AddButton>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f5f5;
`;

const ListContainer = styled.FlatList`
  flex: 1;
  margin-top: 20px;
`;

const ItemContainer = styled.View`
  margin-horizontal: 20px;
`;

const ItemView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InfoView = styled.View`
  width: 80%;
`;

const ButtonView = styled.View`
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

const EditIcon = styled.Image`
  height: 30px;
  width: 30px;
`;

const DeleteIcon = styled.Image`
  height: 35px;
  width: 35px;
`;

const LogoutButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  right: 20px;
`;

const LogoutIcon = styled.Image`
  height: 35px;
  width: 35px;
  align-self: flex-end;
`;

const Logo = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #007bff;
  text-align: center;
`;

const Name = styled.Text`
  font-size: 18px;
  color: #000;
`;

const Description = styled.Text`
  font-size: 15px;
  color: #000;
`;

const CreatedAt = styled.Text`
  font-size: 15px;
  color: #000;
`;

const BottomLine = styled.View`
  height: 1px;
  background-color: #000;
  margin-vertical: 15px;
`;

const NoDataView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const NoDataText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #000;
  text-align: center;
`;

const AddButton = styled.TouchableOpacity`
  height: 50px;
  width: 75%;
  margin-bottom: 20px;
  background-color: #007bff;
  justify-content: center;
  align-items: center;
  margin-horizontal: 20px;
`;

const AddText = styled.Text`
  color: #fff;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
`;

export default HomeScreen;
