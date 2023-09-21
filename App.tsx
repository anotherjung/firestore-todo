import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FIREBASE_DB } from './firebase.config';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';

export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

const App = () => {
 const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState('');
 
  useEffect(() => {
    const todoRef = collection(FIREBASE_DB, 'todos');
  
    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        const todos: any[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data()
          });
        });
  
        setTodos(todos);
      }
    });
  
    // // Unsubscribe from events
    return () => subscriber();
  }, []);
 
   const addTodo = async () => {
     const doc = addDoc(collection(FIREBASE_DB, 'todos'),{ title: todo, done:false})
     setTodo('');
   }


   const renderTodo = ({ item }: any) => {
    const ref = doc(FIREBASE_DB, `todos/${item.id}`)
  
    const toggleDone = async () => {
      updateDoc(ref, { done: !item.done });
    };
  
    const deleteItem = async () => {
      deleteDoc(ref)
    };
  
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.todo}>
          {!item.done && <Button onPress={toggleDone}  title="done" /> }
        <Text style={styles.todoText}>{item.title}</Text>
        {item.done && <Text> is done</Text>}
        </TouchableOpacity>
        <Button onPress={deleteItem} title="delete" />
      </View>
    );
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Add todo"
          onChangeText={(text) => setTodo(text)}
          value={todo}
        />
        <Button style={styles.add} onPress={addTodo} title="Add" disabled={todo === ''} />
      </View>
      {todos.length ? (
        <View><Text>Count {todos.length}</Text>
          <FlatList
            data={todos}
            renderItem={renderTodo}
            keyExtractor={(todo) => todo.id}
          />
        </View>
      ):null}
    </View>
  );

      }


export default App;


const styles = StyleSheet.create({
	container: {
    padding: 8,
		marginHorizontal: 20,
    marginTop: 21,
	},
	form: {
		marginVertical: 20,
		flexDirection: 'row',
		alignItems: 'center'
	},
	input: {
		flex: 1,
		height: 40,
		borderWidth: 1,
		borderRadius: 4,
		padding: 10,
		backgroundColor: '#fff'
	},
	todo: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center'
	},
	todoText: {
		flex: 1,
		paddingHorizontal: 4
	},
	todoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 10,
		marginVertical: 4
	}
});
