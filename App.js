import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const delay = async (time) => {
  return new Promise((res) => {
    setTimeout(res, time);
  })
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState([]);

  useEffect(async () => {
    //espera um segundo para exibir carregamento
    await delay(1000);
    
    try{
      const response = await fetch('https://randomuser.me/api/?results=100&inc=name')
      const json = await response.json();
      setPeople(json.results);
    }
    catch(e){
      console.log(e);
      alert('Error on load data!');
    }
    finally{
      setLoading(false);
    }
  }, [])

  return (
    <SafeAreaView>
      <FlatList
        data={people}
        renderItem={
            ({item}) => {
              return (
                <View style={styles.row}>
                  <Text style={styles.name}>
                    {item.name.first} {item.name.last}
                  </Text>
                </View>
              )
            }
          }
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
        ListEmptyComponent={() => {
          if(loading){
            return (
            <ActivityIndicator
             size="large" 
             style={styles.loading}
             >
             </ActivityIndicator>)
          }
          else{
            return (
              <View style={styles.center}>
                <Text style={styles.message}>
                  Empty!
                </Text>
              </View>
            )
          }
        }}>
      </FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  name: {
    fontSize: 16,
  },
  separator: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 1,
  },
  loading: {
    marginVertical: 20,
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  message: {
    fontSize: 20,
    color: "#111111"
  }
});
