import { StyleSheet, Text, View, SafeAreaView, Platform, ScrollView, Pressable, TextInput, Image } from 'react-native'
import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import axios from 'axios'
import { useState, useEffect } from 'react' 
import { dimensions } from '../style/base'
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("all");
  const [items, setItems] = useState([
    { label: "All", value: "all" },
    { label: "Jewellery", value: "jewelery" },
    { label: "Electronics", value: "electronics" },
    { label: "Men's clothing", value: "men's clothing" },
    { label: "Women's clothing", value: "women's clothing" },
  ])

  useEffect(() => {
      axios.get("https://fakestoreapi.com/products").then((response) => {
        console.log("api called");
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      ;
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 10, zIndex: 1000 }}>
      <Text style={styles.title}>Products</Text>
      <DropDownPicker 
        style={{ backgroundColor: "white", borderColor: "black", borderWidth: 1 }}
        items={items}
        defaultValue={items[0]}
        open={open}
        value={category}
        setOpen={setOpen}
        setValue={setCategory}
        setItems={setItems}
        zIndex={1000}
      />
      </View>
      <ScrollView style={{zIndex: -1}}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", paddingVertical: 10, alignItems: "center", justifyContent: "space-evenly" }}>
        {products.filter((e) => {
          if(category == "all") {
            return e
          } else {
            return e.category === category
          }
        }).map((item, index) => {
          return (
            <View key={index} style={{width: 0.45 * dimensions.fullWidth}}>
                  <Image source={{ uri: item.image }} style={{ width: 100, height: 200, resizeMode: 'contain', alignSelf: "center" }} />
                  <Text numberOfLines={1} style={{ textAlign: "center", fontSize: 12 }}>{item?.title}</Text>
                  <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 5}}>
                    <Text style={{color: "#B31313", fontSize: 14, fontWeight: 500}}>${item?.price}</Text>
                    <View style={{flexDirection: "row", alignItems: "center",}}>
                    <FontAwesome name="star" size={14} color="#FFC72C" />
                    <Text style={{fontSize: 14, color: "#FFC72C", marginLeft: 2}}>{item?.rating?.rate}</Text>
                    </View>
                  </View>
                </View>
          )
        })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProductsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    color: "#0F2C59",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
})