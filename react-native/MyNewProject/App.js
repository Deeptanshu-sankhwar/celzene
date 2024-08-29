import React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';

export default function App() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(['Get Groceries', 'Complete today running']);

  const addTask = () => {
    setTasks([...tasks, task])
    setTask('');
  }

  const deleteTask = (task) => {
    console.log("Deleting task", task)
    setTasks(tasks.filter(element => element != task))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To Do List</Text>
      
      <TextInput style={styles.input} placeholder="Add a new task" value={task} onChangeText={setTask}></TextInput>

      <Button title="Add task" onPress={addTask} />

      <FlatList
        data={tasks}
        renderItem={({item}) => (
          <View>
            <Text>{item}</Text>
            <Button onPress={() => deleteTask(item)} title="Delete">
            </Button>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  }
});
