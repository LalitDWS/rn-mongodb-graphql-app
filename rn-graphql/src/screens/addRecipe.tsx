import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import {CREATE_RECIPE, EDIT_RECIPE} from '../queries/queries';
import images from '../assets/images';

const AddRecipeScreen = (props: any) => {
  const {navigation, route} = props;
  const {refetch, item} = route.params;
  const [name, setName] = useState(item ? item.name : '');
  const [description, setDescription] = useState(item ? item.description : '');
  const [createRecipe] = useMutation(CREATE_RECIPE);
  const [editRecipe] = useMutation(EDIT_RECIPE);

  const handleEdit = async () => {
    try {
      const {
        data: {editRecipe: wasEdited},
      } = await editRecipe({
        variables: {
          ID: item._id,
          recipeInput: {
            name: name,
            description: description,
          },
        },
      });

      if (wasEdited) {
        setName('');
        setDescription('');
        refetch();
        navigation.goBack();
        Alert.alert('GraphQL', 'Data updated successful');
      } else {
        console.error('Error editing recipe');
      }
    } catch (error) {
      console.error('Error editing recipe:', error.message);
    }
  };

  const handleCreate = async () => {
    await createRecipe({variables: {name, description}});
    setName('');
    setDescription('');
    refetch();
    navigation.goBack();
    Alert.alert('GraphQL', 'Data added successful');
  };

  return (
    <Container>
      <CloseButton onPress={() => navigation.goBack()}>
        <CloseIcon source={images.close} resizeMode={'contain'} />
      </CloseButton>
      <Input
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />
      <Input
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        autoCapitalize="none"
      />
      <Button onPress={item ? handleEdit : handleCreate}>
        <AddText>{item ? 'Update data' : 'Add data'}</AddText>
      </Button>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const Input = styled.TextInput`
  width: 80%;
  height: 40px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
`;

const Button = styled.TouchableOpacity`
  width: 80%;
  height: 40px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const AddText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 30px;
  right: 20px;
`;

const CloseIcon = styled.Image`
  height: 35px;
  width: 35px;
`;
export default AddRecipeScreen;
