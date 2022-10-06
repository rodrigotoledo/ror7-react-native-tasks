import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import axios from 'axios'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function App() {
  const [todos, setTodos] = useState();
  const [todoTask, setTodoTask] = useState('');
  const fetchData = () =>{
    axios.get('https://d04b-45-70-35-16.sa.ngrok.io/')
    .then(function (response) {
      setTodos(response.data)
      return true;
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const Todo = ({ todo }) => (
    <View style={styles.todoContainer}>
      <View>
        <Text style={[styles.todoTitle, todo.done ? '' : styles.todoTitleDone]}>{todo.title}</Text>
      </View>
      <View style={styles.buttonActions}>
        {!todo.done ?
        <TouchableOpacity onPress={() => updateTodo(todo.id)}>
          <Icon name="check-circle-outline" size={20} color="#9975bd" />
        </TouchableOpacity>
        :
        <></>
        }
        <TouchableOpacity onPress={() => removeActions(todo.id)}>
          <Icon name="clipboard-remove-outline" size={20} color="#9975bd" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const removeTodo = (todoId) => {
    axios.delete('https://d04b-45-70-35-16.sa.ngrok.io/todos/'+todoId)
    .then(function (response) {
      fetchData()
      return true;
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const updateTodo = (todoId) => {
    axios.put('https://d04b-45-70-35-16.sa.ngrok.io/todos/'+todoId, {todo: {done: true}})
    .then(function (response) {
      fetchData()
      return true;
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const removeActions = (todoId) => {
    Alert.alert(
      "Remover Tarefa",
      "A mesma será excluída do sistema também",
      [
        {
          text: "Cancelar",
          onPress: () => true,
          style: "cancel"
        },
        { text: "OK", onPress: () => removeTodo(todoId) }
      ]
    );
  }

  const sendData = () => {
    axios.post('https://d04b-45-70-35-16.sa.ngrok.io/todos', {todo: {title: todoTask}})
    .then(function (response) {
      setTodoTask('')
      fetchData()
      return true;
    })
    .catch(function (error) {
      console.log(error);
    })
  }



  useEffect(() => {
    fetchData();
  },[])

  const renderTodo = ({ item }) => (
    <Todo todo={item} />
  );


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Minhas tarefas</Text>
        <Icon name="delete" size={25} color="#9975bd" />
      </View>
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={todo => todo.id}
        style={styles.todoListContainer}
      />
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput placeholder='Adicionar tarefa' placeholderTextColor="#FFF" style={styles.textInput} defaultValue={todoTask} onChangeText={newText => setTodoTask(newText)} />
          <TouchableOpacity onPress={() => sendData()}>
            <Icon name="playlist-plus" size={25} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },

  title:{
    fontWeight: 'bold',
    fontSize: 20,
    color: '#9975bd'
  },

  todoTitleDone: {
    textDecorationLine: 'line-through',
    fontWeight: 'bold'
  },

  todoListContainer: {
    marginBottom: 90
  },

  inputContainer: {
    backgroundColor: '#9975bd',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 30,
  },

  textInput: {
    color: '#fff',
    maxWidth: '90%'
  },

  todoContainer: {
    borderWidth: 1,
    borderColor: '#9975bd',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  todoTitle:{
    fontSize: 10,
    color: '#9975bd'
  },
  buttonActions:{
    flexDirection: 'row',
  }
});
